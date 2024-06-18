'use client';

// import { socket } from '@/app/chat/socket';
import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const ChatContext = createContext<Socket | null>(null);

export default function MessengerProvider({ children }: { children: React.ReactNode }) {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socket = io('http://localhost:8080');
		setSocket(socket);
		// socket.on('connect', () => {
		// 	console.log('connected');
		// });
	}, []);

	return <ChatContext.Provider value={socket}>{children}</ChatContext.Provider>;
}
