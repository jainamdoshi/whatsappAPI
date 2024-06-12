'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAtom } from 'jotai';
import { selectedContactsAtom } from '../contacts/[groupId]/page';
import ContactTable from './components/contactTable';

export default function Message() {
	const [selectedContacts, _] = useAtom(selectedContactsAtom);

	return (
		<div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
			<div className='space-y-8'>
				<div className='space-y-4'>
					<h1 className='text-3xl font-bold tracking-tight'>Send Message</h1>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<div className='space-y-2'>
							<Label htmlFor='sender-phone'>Sender Phone</Label>
							<Select defaultValue='555-1234'>
								<SelectTrigger>
									<SelectValue placeholder='Select sender phone' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='555-1234'>555-1234</SelectItem>
									<SelectItem value='555-5678'>555-5678</SelectItem>
									<SelectItem value='555-9012'>555-9012</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='message-template'>Message Template</Label>
							<Select defaultValue='template-1'>
								<SelectTrigger>
									<SelectValue placeholder='Select message template' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='template-1'>Template 1</SelectItem>
									<SelectItem value='template-2'>Template 2</SelectItem>
									<SelectItem value='template-3'>Template 3</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='flex justify-end mt-auto'>
							<Button>Send Message</Button>
						</div>
					</div>
					<ContactTable contacts={selectedContacts} />
				</div>
				<div className='space-y-4'></div>
			</div>
		</div>
	);
}
