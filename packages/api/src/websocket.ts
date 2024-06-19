import { Server } from 'socket.io';
import { server } from '.';

export let io: Server;

export function initWebSocket() {
	io = new Server(server, {
		cors: {
			origin: 'http://localhost:3000'
			// methods: ['GET', 'POST']
		}
	});
	console.log('WebSocket is running');
}
