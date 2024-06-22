'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChatContext } from '@/providers/messengerProvider';
import { getSenderContacts } from '@/server/senderContact/actions';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export function SenderContactProfile() {
	const { senderContactId, setSenderContactId } = useContext(ChatContext);
	const router = useRouter();

	const { data, isLoading, isError } = useQuery({
		queryKey: ['senderContact', senderContactId],
		queryFn: getSenderContacts
	});

	if (!data || isLoading) return null;
	if (isError) return <div>Error</div>;

	const handleSelectContact = (contactId: number) => {
		setSenderContactId ? setSenderContactId(contactId) : console.error('setSenderContactId not defined');
		router.push(`/chat`);
	};

	const senderContact = data.find((contact) => contact.id === senderContactId);
	return (
		<>
			<Avatar className='h-8 w-8'>
				{/* <AvatarImage src='/placeholder-user.jpg' /> */}
				<AvatarFallback>{senderContact?.name[0]}</AvatarFallback>
			</Avatar>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>{senderContact?.name}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					{data.map((contact) => (
						<Button
							key={contact.id}
							variant='ghost'
							className='w-full'
							onClick={() => handleSelectContact(contact.id)}
						>
							{contact.name} ({contact.phoneNumber})
						</Button>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
