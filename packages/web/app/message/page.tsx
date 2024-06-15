import { Button } from '@/components/ui/button';
import ContactTable from './components/contactTable';
import { SenderDetails, SendMessageButton } from './components/senderDetails';
import { redirect } from 'next/navigation';

export default function Message() {
	return (
		<div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
			<div className='space-y-8'>
				<div className='space-y-4'>
					<h1 className='text-3xl font-bold tracking-tight'>Send Message</h1>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<SenderDetails />
						<div className='flex justify-end mt-auto'>
							<SendMessageButton />
						</div>
					</div>
					<ContactTable />
				</div>
				<div className='space-y-4'></div>
			</div>
		</div>
	);
}
