import { ContactIcon } from 'lucide-react';
import Link from 'next/link';
import GroupList from './components/groupList';

export default function GroupsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
			<div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
				<div className='flex h-full max-h-screen flex-col gap-2'>
					<div className='flex h-[60px] items-center border-b px-6'>
						<Link href='#' className='flex items-center gap-2 font-semibold' prefetch={false}>
							<ContactIcon className='h-6 w-6' />
							<span className=''>Contacts</span>
						</Link>
						{/* <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
							<SearchIcon className='h-4 w-4' />
							<span className='sr-only'>Search</span>
						</Button> */}
					</div>
					<GroupList />
				</div>
			</div>
			{children}
		</div>
	);
}
