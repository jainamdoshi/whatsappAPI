import axios from 'axios';
import { WHATSAPP_USER_ACCESS_TOKEN } from '../config/init';
import { getContacts } from '../model/contacts';
import { Contact } from '../model/db/schema/contacts';
import { IncomingMessage } from '../model/db/schema/incomingMessages';
import { OutgoingMessage } from '../model/db/schema/outgoingMessages';
import { SenderContact } from '../model/db/schema/senderContacts';
import {
	TWhatsAppMessageStatus,
	WhatsAppMessage,
	WhatsAppMessageResponse,
	WhatsAppMetadataChange
} from '../model/eventNotification';
import { addIncomingMessage, Message, updateOutgoingMessage } from '../model/messages';
import { getSenderContacts } from '../model/senderContacts';

const url = `https://graph.facebook.com/v19.0/`;
const requestHeaders = {
	Authorization: `Bearer ${WHATSAPP_USER_ACCESS_TOKEN}`,
	'Content-Type': 'application/json'
};

type MessageRequestBody = {
	messaging_product: string;
	to: string;
	type: string;
	template?: {
		name: string;
		language: {
			code: string;
		};
	};
	text?: {
		body: string;
	};
};

export async function sendTemplateMessageToContacts(
	senderContact: SenderContact,
	contacts: Contact[],
	templateName: string
) {
	const res = await Promise.all(
		contacts.map((contact) => {
			return sendTemplateMessage(senderContact, contact, templateName);
		})
	);

	return res;
}

export async function sendTemplateMessage(senderContact: SenderContact, contact: Contact, templateName: string) {
	const requestBody = {
		messaging_product: 'whatsapp',
		to: contact.phoneNumber,
		type: 'template',
		template: {
			name: templateName,
			language: {
				code: 'en_US'
			}
		}
	};

	return await sendMessage(url, senderContact, requestBody, requestHeaders);
}

export async function sendTextMessage(senderContact: SenderContact, contact: Contact, message: string) {
	const requestBody = {
		messaging_product: 'whatsapp',
		to: contact.phoneNumber,
		type: 'text',
		text: { body: message }
	};

	return await sendMessage(url, senderContact, requestBody, requestHeaders);
}

async function sendMessage(
	url: string,
	senderContact: SenderContact,
	requestBody: MessageRequestBody,
	requestHeaders: {
		Authorization: string;
		'Content-Type': string;
	}
) {
	const response = await axios.post(url + `${senderContact.whatsAppPhoneNumberId}/messages`, requestBody, {
		headers: requestHeaders
	});
	return response.data as WhatsAppMessageResponse;
}

export async function parseNewIncomingMessage(event: WhatsAppMessage, metadata: WhatsAppMetadataChange) {
	if (event.type == 'text') {
		return (await addNewIncomingTextMessage(event, metadata)) as IncomingMessage;
	}
}

async function addNewIncomingTextMessage(message: WhatsAppMessage, metadata: WhatsAppMetadataChange) {
	const fromContact = await getContacts({
		filter: {
			phoneNumber: [message.from]
		}
	});

	const toContact = await getSenderContacts({
		filter: {
			phoneNumber: [metadata.displayPhoneNumber]
		}
	});

	if (!fromContact.length || !toContact.length) {
		console.error('Contacts not found');
		return;
	}

	return await addIncomingMessage({
		fromContactId: fromContact[0].id,
		toContactId: toContact[0].id,
		timestamp: message.timestamp,
		message: message.text.body
	});
}

export async function updateMessage(waid: string, status: TWhatsAppMessageStatus, timestamp: Date) {
	const updatedFields: Partial<OutgoingMessage> = {};

	if (status == 'sent') {
		updatedFields.sentTimestamp = timestamp;
	} else if (status == 'delivered') {
		updatedFields.deliveredTimestamp = timestamp;
	} else if (status == 'read') {
		updatedFields.readTimestamp = timestamp;
	} else if (status == 'failed') {
		updatedFields.failedTimestamp = timestamp;
	}

	return await updateOutgoingMessage(updatedFields, { whatsAppMessageId: [waid] });
}

export function mergeIncomingAndOutgoingMessages(
	incomingMessages: IncomingMessage[],
	outgoingMessages: OutgoingMessage[]
): Message[] {
	const messages = incomingMessages.map((message) => {
		return { ...message, type: 'incoming' } as Message;
	});

	outgoingMessages.forEach((message) => {
		messages.push({ ...message, type: 'outgoing', timestamp: message.sentTimestamp } as Message);
	});

	messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

	return messages;
}
