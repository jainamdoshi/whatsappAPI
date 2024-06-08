'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Contact, getContactsByGroup } from '@/server/contact/action';
import { getGroup, Group } from '@/server/group/action';
import { useQuery } from '@tanstack/react-query';
import { FilePenIcon } from 'lucide-react';
import { useState } from 'react';

export default function GroupUsers({ params }: { params: { groupId: string } }) {
	const groupQuery = useQuery<Group>({
		queryKey: ['group', params.groupId],
		queryFn: () => getGroup(params.groupId)
	});

	const contactsQuery = useQuery({
		queryKey: ['contacts', params.groupId],
		queryFn: () => getContactsByGroup(parseInt(params.groupId))
	});

	if (!groupQuery.data) return null;

	return (
		<div className='flex flex-col'>
			<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
				<div className='flex items-center'>
					<h1 className='font-semibold text-lg md:text-2xl'>{groupQuery.data.name}</h1>
					{/* <Button className='ml-auto' size='sm'>
						Add Contact
					</Button> */}
				</div>
				<div className='border shadow-sm rounded-lg'></div>
				<ContactTable contacts={contactsQuery.data || []} />
			</main>
		</div>
	);
}

function ContactTable({ contacts }: { contacts: Contact[] }) {
	const [selected, setSelected] = useState<boolean[]>([]);
	const [selectedCount, setSelectedCount] = useState(0);

	const handleAllSelectedCheckbox = () => {
		if (selectedCount == contacts.length) {
			setSelected(new Array(contacts.length).fill(false));
			setSelectedCount(0);
		} else {
			setSelected(new Array(contacts.length).fill(true));
			setSelectedCount(contacts.length);
		}
	};

	const handleContactCheckbox = (index: number) => {
		const newSelected = [...selected];
		selected[index] ? setSelectedCount(selectedCount - 1) : setSelectedCount(selectedCount + 1);
		newSelected[index] = !newSelected[index];
		setSelected(newSelected);
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[40px]'>
						<Checkbox
							id='select-all'
							onClick={handleAllSelectedCheckbox}
							checked={selectedCount == contacts.length}
						/>
					</TableHead>
					<TableHead className='max-w-[200px]'>Name</TableHead>
					<TableHead>Phone Number</TableHead>
					<TableHead className='w-[80px]'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{contacts.map((contact, index) => (
					<TableRow key={contact.id}>
						<TableCell>
							<Checkbox
								id={`contact-${contact.id}`}
								checked={selected[index] || false}
								onClick={() => handleContactCheckbox(index)}
							/>
						</TableCell>
						<TableCell className='font-medium'>{contact.name}</TableCell>
						<TableCell>+{contact.phoneNumber}</TableCell>
						<TableCell>
							<Button variant='ghost' size='icon'>
								<FilePenIcon className='h-4 w-4' />
								<span className='sr-only'>Edit</span>
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
