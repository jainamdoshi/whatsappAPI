// 'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Suspense } from 'react';
import UserDisplay from './userDisplay';

// import { useEffect, useState } from 'react';

export type Group = {
	id: number;
	name: string;
	parentGroupId: number;
};

export default async function Home() {
	const groups: Group[] = await getData();
	let users: {
		[key: number]: {
			id: number;
			name: string;
			phoneNumber: string;
		};
	} = {};
	// const [users, setUsers] = useState([]);

	return (
		<div>
			<h1>WhatsApp Dashboard</h1>
			<div>Users</div>

			<Suspense fallback={<div>Loading...</div>}>
				<Accordion type='multiple'>
					{groups.map((group) => {
						if (!group.parentGroupId) {
							return (
								<AccordionItem key={group.id} value={group.id.toString()}>
									<AccordionTrigger>{group.name}</AccordionTrigger>
									<AccordionContent>
										{
											<Accordion type='single' collapsible>
												{groups.map((subGroup) => {
													if (subGroup.parentGroupId == group.id) {
														return <UserDisplay key={subGroup.id} group={subGroup} />;
													} else {
														return null;
													}
												})}
											</Accordion>
										}
									</AccordionContent>
								</AccordionItem>
							);
						}
					})}
					{/* <AccordionItem value='item-1'>
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
					</AccordionItem> */}
				</Accordion>
			</Suspense>
		</div>
	);
}

async function getData() {
	const res = await fetch('http://localhost:8080/group');

	// console.log(res);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return await res.json();
}

// async function getUsers(groupId: number) {
// 	const res = await fetch(`http://localhost:8080/user?group=${groupId}`);

// 	if (!res.ok) {
// 		throw new Error('Failed to fetch data');
// 	}

// 	return await res.json();
// }
