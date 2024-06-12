import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Contact } from '@/server/contact/action';
import { Delete } from 'lucide-react';

export default function ContactTable({ contacts }: { contacts: Contact[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[40px]'></TableHead>
					<TableHead className='max-w-[200px]'>Name</TableHead>
					<TableHead>Phone Number</TableHead>
					<TableHead className='w-[80px]'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{contacts.map((contact) => (
					<TableRow key={contact.id}>
						<TableCell></TableCell>
						<TableCell className='font-medium'>{contact.name}</TableCell>
						<TableCell>+{contact.phoneNumber}</TableCell>
						<TableCell>
							<Button variant='ghost' size='icon'>
								<Delete className='h-4 w-4' />
								<span className='sr-only'>Remove</span>
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
