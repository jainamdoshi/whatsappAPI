export type Group = {
	id: number;
	name: string;
	subGroup: Group[];
};

export async function getGroups(): Promise<Group[]> {
	const response = await fetch('http://localhost:8080/group');
	return await response.json();
}

export async function getGroup(groupId: string): Promise<Group> {
	const response = await fetch(`http://localhost:8080/group/${groupId}`);
	return await response.json();
}
