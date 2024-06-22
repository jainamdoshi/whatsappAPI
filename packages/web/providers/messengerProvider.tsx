'use client';

import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type MessengerProvider = {
	senderContactId: number;
	socket?: Socket | null;
	setSenderContactId?: (id: number) => void;
};

const DEFAULT_SENDER_CONTACT_ID = 1;

export const ChatContext = createContext<MessengerProvider>({
	senderContactId: DEFAULT_SENDER_CONTACT_ID
});

export default function MessengerProvider({ children }: { children: React.ReactNode }) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [senderContactId, setSenderContactId] = useState<number>(DEFAULT_SENDER_CONTACT_ID);

	useEffect(() => {
		const socket = io('http://localhost:8080');
		setSocket(socket);
	}, []);

	return (
		<ChatContext.Provider value={{ socket, senderContactId, setSenderContactId }}>{children}</ChatContext.Provider>
	);
}
