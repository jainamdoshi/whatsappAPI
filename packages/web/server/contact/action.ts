export type Contact = {
	id: number;
	name: string;
	phoneNumber: string;
};

export async function getContactsByGroup(groupId: number): Promise<Contact[]> {
	const response = await fetch(`http://localhost:8080/user?group=${groupId}`);
	return await response.json();
}
