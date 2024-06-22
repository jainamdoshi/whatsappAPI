import { io } from '../websocket';

export function notifyNewIncomingMessage(senderContactId: number, contactId: number) {
	io.emit(`newIncomingMessages-${senderContactId}-${contactId}`);
}

export function notifyNewOutgoingMessage(senderContactId: number, contactId: number) {
	io.emit(`newOutgoingMessages-${senderContactId}-${contactId}`);
}

export function notifyNewChatContact(senderContactId: number) {
	io.emit(`newChatContact-${senderContactId}`);
}
