'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Contact } from '@/server/contact/action';
import { useAtom } from 'jotai';
import { FilePenIcon } from 'lucide-react';
import { useState } from 'react';
import { selectedContactsAtom } from '../page';

export default function ContactTable({ contacts }: { contacts: Contact[] }) {
	const [selectedContacts, setSelectedContacts] = useAtom(selectedContactsAtom);

	let count = 0;
	const prevSelectedContacts = contacts.map((contact) => {
		if (selectedContacts.find((c) => c.id == contact.id)) {
			count++;
			return true;
		}
		return false;
	});

	const [selected, setSelected] = useState<boolean[]>(prevSelectedContacts);
	const [selectedCount, setSelectedCount] = useState(count);

	const handleAllSelectedCheckbox = () => {
		if (selectedCount == contacts.length) {
			setSelected(new Array(contacts.length).fill(false));
			setSelectedContacts(selectedContacts.filter((contact) => !contacts.find((c) => c.id == contact.id)));
			setSelectedCount(0);
		} else {
			setSelected(new Array(contacts.length).fill(true));
			setSelectedContacts(selectedContacts.concat(contacts));
			setSelectedCount(contacts.length);
		}
	};

	const handleContactCheckbox = (index: number) => {
		const newSelected = [...selected];

		if (selected[index]) {
			setSelectedContacts(selectedContacts.filter((contact) => contact.id != contacts[index].id));
			setSelectedCount(selectedCount - 1);
		} else {
			setSelectedContacts([...selectedContacts, contacts[index]]);
			setSelectedCount(selectedCount + 1);
		}

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
							checked={selectedCount != 0 ? selectedCount == contacts.length : false}
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
