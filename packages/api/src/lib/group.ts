import { Group } from '../model/db/schema/groups';

export type NestedGroup = {
	id: number;
	name: string;
	subGroup: NestedGroup[];
};

export function parseGroups(groups: Group[]): NestedGroup[] {
	const groupMap = new Map<number, NestedGroup>();
	const rootGroups: NestedGroup[] = [];

	groups.forEach((group) => {
		const nestedGroup: NestedGroup = {
			id: group.id,
			name: group.name,
			subGroup: []
		};

		groupMap.set(group.id, nestedGroup);

		if (!group.parentGroupId) {
			rootGroups.push(nestedGroup);
		} else {
			const parentGroup = groupMap.get(group.parentGroupId);
			if (parentGroup) {
				parentGroup.subGroup.push(nestedGroup);
			}
		}
	});

	return rootGroups;
}
