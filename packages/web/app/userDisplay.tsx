'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Group } from './page';
import { useState } from 'react';

// let users;

type usersData = {
	[key: number]: {
		id: number;
		name: string;
		phoneNumber: string;
	}[];
};

let userData: usersData = {};

export default function UserDisplay({ group }: { group: Group }) {
	const [users, setUsers] = useState<usersData>({});

	const getUsers = async (groupId: number) => {
		const res = await fetch(`http://localhost:8080/user?group=${groupId}`);

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await res.json();
		userData[groupId] = data;
		console.log(userData);
		setUsers(userData);
	};

	return (
		<AccordionItem key={group.id} value={group.id.toString()}>
			<AccordionTrigger onClick={() => getUsers(group.id)}>
				<div>{group.name}</div>
			</AccordionTrigger>
			<AccordionContent>
				{users[group.id] &&
					users[group.id].map((user) => {
						return (
							<div key={user.id}>
								<span>{user.name}</span>
								<span className='pl-2'>{user.phoneNumber}</span>
							</div>
						);
					})}
			</AccordionContent>
		</AccordionItem>
	);
}
