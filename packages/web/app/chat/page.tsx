import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { SearchIcon, SendIcon } from 'lucide-react';

export default function Chat() {
	return (
		<div className='flex flex-col'>
			<div className='flex-1 overflow-auto p-4'>
				<div className='grid gap-4'>
					<div className='flex items-start gap-4'>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='grid gap-1 text-sm'>
							<div className='font-medium'>Olivia Davis</div>
							<div className='rounded-lg bg-gray-100 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-50'>
								Hey, hows it going? I wanted to follow up on the project we discussed yesterday.
							</div>
							<div className='text-xs text-gray-500 dark:text-gray-400'>9:15 AM</div>
						</div>
					</div>
					<div className='flex items-start gap-4 justify-end'>
						<div className='grid gap-1 text-sm'>
							<div className='font-medium'>You</div>
							<div className='rounded-lg bg-blue-500 p-3 text-gray-50'>
								Hi Olivia, Im doing well, thanks for asking. Lets discuss the project timeline in our
								meeting later today.
							</div>
							<div className='text-xs text-gray-500 dark:text-gray-400'>9:20 AM</div>
						</div>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
					<div className='flex items-start gap-4'>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='grid gap-1 text-sm'>
							<div className='font-medium'>Alex Smith</div>
							<div className='rounded-lg bg-gray-100 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-50'>
								Sounds good, Ill make sure to have all the necessary information ready for the meeting.
							</div>
							<div className='text-xs text-gray-500 dark:text-gray-400'>Yesterday</div>
						</div>
					</div>
					<div className='flex items-start gap-4 justify-end'>
						<div className='grid gap-1 text-sm'>
							<div className='font-medium'>You</div>
							<div className='rounded-lg bg-blue-500 p-3 text-gray-50'>
								Great, Im looking forward to it. Let me know if you have any other questions in the
								meantime.
							</div>
							<div className='text-xs text-gray-500 dark:text-gray-400'>Yesterday</div>
						</div>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</div>
			<div className='sticky bottom-0 flex w-full items-center gap-2 bg-white p-4 dark:bg-gray-950'>
				<Textarea
					placeholder='Type your message...'
					className='h-10 flex-1 resize-none rounded-lg border border-gray-200 bg-gray-100 p-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-blue-500 dark:focus:ring-blue-500'
				/>
				<Button size='icon' className='rounded-full'>
					<SendIcon className='h-5 w-5' />
					<span className='sr-only'>Send</span>
				</Button>
			</div>
		</div>
	);
}
