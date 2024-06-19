export type Contact = {
	id: number;
	name: string;
	phoneNumber: string;
};

export async function getContactsByGroup(groupId: number): Promise<Contact[]> {
	const response = await fetch(`http://localhost:8080/contact?group=${groupId}`);
	return await response.json();
}

export async function getContactById(contactId: number): Promise<Contact> {
	const response = await fetch(`http://localhost:8080/contact?id=${contactId}`);
	return (await response.json())[0];
}
