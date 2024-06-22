import { Button } from '@/components/ui/button';
import MessengerProvider from '@/providers/messengerProvider';
import { SearchIcon } from 'lucide-react';
import ChatContactsList from './components/chatContactsList';
import { SenderContactProfile } from './components/senderContactProfile';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='grid min-h-screen w-full grid-cols-[280px_1fr]'>
			<MessengerProvider>
				<div className='flex flex-col border-r bg-gray-100/40 p-4 dark:bg-gray-800/40'>
					<div className='flex h-[60px] items-center justify-between'>
						<div className='flex items-center gap-2 font-semibold'>
							<SenderContactProfile />
						</div>
						<Button variant='ghost' size='icon' className='rounded-full'>
							<SearchIcon className='h-5 w-5' />
							<span className='sr-only'>Search</span>
						</Button>
					</div>
					<div className='flex-1 overflow-auto'>
						<ChatContactsList />
					</div>
				</div>
				{children}
			</MessengerProvider>
		</div>
	);
}
