'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatContext } from '@/providers/messengerProvider';
import { getChatContacts } from '@/server/chat/actions';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useContext } from 'react';

export default function ChatContactsList() {
	const { socket, senderContactId } = useContext(ChatContext);

	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['chatContacts', senderContactId],
		queryFn: () => getChatContacts(senderContactId)
	});

	if (!data || isLoading) return null;
	if (isError) return <div>Error</div>;

	socket?.on(`newChatContact-${senderContactId}`, () => {
		refetch();
	});

	return (
		<nav className='grid gap-2 py-4'>
			{data.map((contact) => (
				<Link
					key={contact.id}
					href={`/chat/${contact.id}`}
					className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
					prefetch={false}
				>
					<Avatar className='h-8 w-8'>
						<AvatarImage src='/placeholder-user.jpg' />
						<AvatarFallback>{contact.name[0]}</AvatarFallback>
					</Avatar>
					<div className='flex-1 truncate'>
						<div className='font-medium'>{contact.name}</div>
						{/* <div className='text-sm text-gray-500 dark:text-gray-400'>{contact.lastMessage}</div> */}
					</div>
					{/* <div className='text-sm text-gray-500 dark:text-gray-400'>{contact.lastMessageTime}</div> */}
				</Link>
			))}
		</nav>
	);
}
