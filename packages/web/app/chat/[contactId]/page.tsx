'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatContext } from '@/providers/messengerProvider';
import { getChatMessages, Message, sendTextMessage } from '@/server/chat/actions';
import { getContactById } from '@/server/contact/action';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SendIcon } from 'lucide-react';
import { useContext, useState } from 'react';

export default function Chat({ params }: { params: { contactId: string } }) {
	const { socket, senderContactId } = useContext(ChatContext);
	const [newMessage, setNewMessage] = useState('');

	const messagesQuery = useQuery({
		queryKey: ['chatContacts', params.contactId],
		queryFn: () => getChatMessages(senderContactId, parseInt(params.contactId))
	});

	const contactQuery = useQuery({
		queryKey: ['contact', params.contactId],
		queryFn: () => getContactById(parseInt(params.contactId))
	});

	const sendMessage = useMutation({
		mutationFn: () => sendTextMessage(senderContactId, parseInt(params.contactId), newMessage)
	});

	socket?.on(`newIncomingMessages-${senderContactId}-${params.contactId}`, (_: Message) => {
		messagesQuery.refetch();
	});

	socket?.on(`newOutgoingMessages-${senderContactId}-${params.contactId}`, (_: Message) => {
		messagesQuery.refetch();
	});

	if (!messagesQuery.data || messagesQuery.isLoading || !contactQuery.data || contactQuery.isLoading) return null;
	if (messagesQuery.isError || contactQuery.isError) return <div>Error</div>;

	return (
		<div className='flex flex-col'>
			<div className='font-semibold p-4 w-full bg-slate-200'>{contactQuery.data.name} +{contactQuery.data.phoneNumber}</div>
			<div className='flex-1 overflow-auto p-4'>
				{messagesQuery.data.map((message: Message) => {
					if (message.type == 'incoming') {
						return (
							<IncomingMessage
								key={message.id}
								name={contactQuery.data.name}
								message={message.message}
								timestamp={message.timestamp}
							/>
						);
					} else {
						return (
							<OutgoingMessage key={message.id} message={message.message} timestamp={message.timestamp} />
						);
					}
				})}
			</div>
			<div className='sticky bottom-0 flex w-full items-center gap-2 bg-white p-4 dark:bg-gray-950'>
				<Textarea
					placeholder='Type your message...'
					className='h-10 flex-1 resize-none rounded-lg border border-gray-200 bg-gray-100 p-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-blue-500 dark:focus:ring-blue-500'
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<Button size='icon' className='rounded-full' onClick={() => sendMessage.mutate()}>
					<SendIcon className='h-5 w-5' />
					<span className='sr-only'>Send</span>
				</Button>
			</div>
		</div>
	);
}

function IncomingMessage({ name, message, timestamp }: { name: string; message: string; timestamp: Date }) {
	return (
		<div className='flex items-start gap-4 content-center my-4'>
			<Avatar className='h-8 w-8 mt-1'>
				{/* <AvatarImage src='/placeholder-user.jpg' /> */}
				<AvatarFallback>{name[0]}</AvatarFallback>
			</Avatar>
			<div className='grid gap-1 text-sm'>
				<div className='font-medium'>{name}</div>
				<div className='rounded-lg bg-gray-100 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-50'>
					{message}
				</div>
				<div className='text-xs text-gray-500 dark:text-gray-400'>{timestamp.toDateString()}</div>
			</div>
		</div>
	);
}

function OutgoingMessage({ message, timestamp }: { message: string; timestamp: Date }) {
	return (
		<div className='flex items-start gap-4 justify-end my-4'>
			<div className='grid gap-1 text-sm'>
				<div className='font-medium'>You</div>
				<div className='rounded-lg bg-blue-500 p-3 text-gray-50'>{message}</div>
				<div className='text-xs text-gray-500 dark:text-gray-400'>{timestamp.toDateString()}</div>
			</div>
			<Avatar className='h-8 w-8 mt-1'>
				{/* <AvatarImage src='/placeholder-user.jpg' /> */}
				<AvatarFallback>Y</AvatarFallback>
			</Avatar>
		</div>
	);
}
