import axios from 'axios';
import { WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_USER_ACCESS_TOKEN } from '../config/init';
import { getContacts } from '../model/contacts';
import { Contact } from '../model/db/schema/contacts';
import { WhatsAppMessage } from '../model/eventNotification';
import { addIncomingMessage } from '../model/messages';

export async function sendMessageToContacts(phoneNumbers: string[], templateName: string) {
	// if (!phoneNumbers.length || !templateName) {
	// 	return null;
	// }
	// const users = await getUsers({
	// 	filter: {
	// 		phoneNumber: phoneNumbers
	// 	}
	// });
	// const results = await Promise.all(
	// 	users.map((user) => {
	// 		return sendMessage(user, templateName);
	// 	})
	// );
	// return results;
}

export async function sendTemplateMessage(contact: Contact, templateName: string) {
	const url = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

	const requestHeaders = {
		Authorization: `Bearer ${WHATSAPP_USER_ACCESS_TOKEN}`,
		'Content-Type': 'application/json'
	};

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

	// const requestBody = {
	// 	messaging_product: 'whatsapp',
	// 	to: contact.phoneNumber,
	// 	type: 'text',
	// 	text: { body: 'This is test message' }
	// };

	const response = await axios.post(url, requestBody, { headers: requestHeaders });
	return response.data;
}

export async function parseNewIncomingMessage(event: WhatsAppMessage, metadata: WhatsAppMetadataChange) {
	if (event.type == 'text') {
		return await addNewTextMessage(event, metadata);
	}
}

async function addNewTextMessage(message: WhatsAppMessage, metadata: WhatsAppMetadataChange) {
	const fromContact = await getContacts({
		filter: {
			phoneNumber: [message.from]
		}
	});

	const toContact = await getSenderContact({
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
		timestamp: new Date(parseInt(message.timestamp) * 1000),
		message: message.text.body
	});
}
