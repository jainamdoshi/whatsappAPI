'use client';

import { getGroups, Group } from '@/server/group/action';
import { useQuery } from '@tanstack/react-query';
import UserGroup from './group';

export default function GroupList() {
	const { data, isLoading, isError } = useQuery<Group[]>({
		queryKey: ['groups'],
		queryFn: getGroups
	});

	if (isLoading) return null;
	if (isError) return <div>Error</div>;

	return (
		<div className='flex-1 overflow-auto py-2'>
			{data && data.map((group) => <UserGroup key={group.id} group={group} />)}
		</div>
	);
}
