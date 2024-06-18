import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import MessengerProvider from '@/providers/messengerProvider';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='grid min-h-screen w-full grid-cols-[280px_1fr]'>
			<MessengerProvider>
				<div className='flex flex-col border-r bg-gray-100/40 p-4 dark:bg-gray-800/40'>
					<div className='flex h-[60px] items-center justify-between'>
						<div className='flex items-center gap-2 font-semibold'>
							<Avatar className='h-8 w-8'>
								<AvatarImage src='/placeholder-user.jpg' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<span>Chat</span>
						</div>
						<Button variant='ghost' size='icon' className='rounded-full'>
							<SearchIcon className='h-5 w-5' />
							<span className='sr-only'>Search</span>
						</Button>
					</div>
					<div className='flex-1 overflow-auto'>
						<nav className='grid gap-2 py-4'>
							<Link
								href='#'
								className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700'
								prefetch={false}
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage src='/placeholder-user.jpg' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div className='flex-1 truncate'>
									<div className='font-medium'>Olivia Davis</div>
									<div className='text-sm text-gray-500 dark:text-gray-400'>Hey, hows it going?</div>
								</div>
								<div className='text-sm text-gray-500 dark:text-gray-400'>9:15 AM</div>
							</Link>
							<Link
								href='#'
								className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
								prefetch={false}
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage src='/placeholder-user.jpg' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div className='flex-1 truncate'>
									<div className='font-medium'>Alex Smith</div>
									<div className='text-sm text-gray-500 dark:text-gray-400'>
										Did you see the new design?
									</div>
								</div>
								<div className='text-sm text-gray-500 dark:text-gray-400'>Yesterday</div>
							</Link>
							<Link
								href='#'
								className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
								prefetch={false}
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage src='/placeholder-user.jpg' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div className='flex-1 truncate'>
									<div className='font-medium'>Sarah Johnson</div>
									<div className='text-sm text-gray-500 dark:text-gray-400'>
										Lets discuss the project timeline.
									</div>
								</div>
								<div className='text-sm text-gray-500 dark:text-gray-400'>2 days ago</div>
							</Link>
						</nav>
					</div>
				</div>
				{children}
			</MessengerProvider>
		</div>
	);
}
