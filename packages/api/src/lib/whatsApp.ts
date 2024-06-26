import { not } from 'drizzle-orm';
import {
	WhatsAppEventEntry,
	WhatsAppMessage,
	WhatsAppMetadataChange,
	WhatsAppStatus
} from '../model/eventNotification';
import { parseNewIncomingMessage, updateMessage } from './messages';
import { notifyNewChatContact, notifyNewIncomingMessage } from './socketNotifications';

export async function resolveWhatsAppEventNotification(entries: WhatsAppEventEntry[]) {
	for (const entry of entries) {
		for (const change of entry.changes) {
			if (change.field != 'messages') {
				console.error('Invalid field');
				continue;
			}

			const metadata = change.value.metadata;

			if (change.value.messages?.length) {
				await resolveIncomingMessages(change.value.messages, metadata);
			} else if (change.value.statuses?.length) {
				await resolveOutgoingMessages(change.value.statuses);
			}
		}
	}
}

async function resolveIncomingMessages(messages: WhatsAppMessage[], metadata: WhatsAppMetadataChange) {
	for (const message of messages) {
		const newIncomingMessage = await parseNewIncomingMessage(message, metadata);

		if (newIncomingMessage) {
			notifyNewIncomingMessage(newIncomingMessage.toContactId, newIncomingMessage.fromContactId);
			notifyNewChatContact(newIncomingMessage.toContactId);
		}
	}
}

async function resolveOutgoingMessages(messages: WhatsAppStatus[]) {
	for (const message of messages) {
		const res = await updateMessage(message.id, message.status, message.timestamp);

		if (message.status == 'sent') {
			notifyNewIncomingMessage(res.fromContactId, res.toContactId);
			notifyNewChatContact(res.fromContactId);
		}
	}
}
