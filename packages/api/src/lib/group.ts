import { Group } from '../model/db/schema/groups';

export type NestedGroup = {
	id: number;
	name: string;
	subGroup: NestedGroup[];
};

export function parseGroups(groups: Group[]): NestedGroup[] {
	const groupMap = new Map<number, NestedGroup>();
	const rootGroups: NestedGroup[] = groups
		.filter((group) => !group.parentGroupId)
		.map((group) => {
			const res = parseGroup(group);
			groupMap.set(group.id, res);
			return res;
		});

	const nonRootGroups = groups.filter((group) => group.parentGroupId);

	nonRootGroups.forEach((group) => {
		const nestedGroup: NestedGroup = parseGroup(group);

		const parentGroup = groupMap.get(group.parentGroupId as number);
		parentGroup?.subGroup.push(nestedGroup);
	});

	return rootGroups;
}

function parseGroup(group: Group) {
	return {
		id: group.id,
		name: group.name,
		subGroup: []
	};
}
