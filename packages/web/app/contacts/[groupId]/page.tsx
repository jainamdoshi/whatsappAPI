'use client';

import { Button } from '@/components/ui/button';
import { Contact, getContactsByGroup } from '@/server/contact/action';
import { getGroup, Group } from '@/server/group/action';
import { useQuery } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import Link from 'next/link';
import ContactTable from './components/contactTable';

export const selectedContactsAtom = atom<Contact[]>([]);

export default function GroupContacts({ params }: { params: { groupId: string } }) {
	const [selectedContacts, _] = useAtom(selectedContactsAtom);

	const groupQuery = useQuery<Group>({
		queryKey: ['group', params.groupId],
		queryFn: () => getGroup(params.groupId)
	});

	const contactsQuery = useQuery<Contact[]>({
		queryKey: ['contacts', params.groupId],
		queryFn: () => getContactsByGroup(parseInt(params.groupId))
	});

	if (!groupQuery.data) return null;

	return (
		<div className='flex flex-col'>
			<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
				<div className='flex items-center'>
					<h1 className='font-semibold text-lg md:text-2xl'>{groupQuery.data.name}</h1>
					<div className='ml-auto'>Selected Contacts {selectedContacts.length}</div>
					<Button asChild className='ml-auto'>
						<Link href={`/message`}>Send Message</Link>
					</Button>
				</div>
				<div className='border shadow-sm rounded-lg'></div>
				<ContactTable contacts={contactsQuery.data || []} />
			</main>
		</div>
	);
}
