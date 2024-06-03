import { Group } from '../model/db/schema/groups';
import { UserGroup } from '../model/db/schema/userGroups';
import { User } from '../model/db/schema/users';
import { addGroup, addUserGroup, getGroup, getUserGroups } from '../model/groups';
import { addUser, getUsers } from '../model/users';
import { RawUserData } from './csvLoader';

export async function parseRawUserData(users: RawUserData[], groupId: number) {
	const allUsers: User[] = await getUsers();
	const allGroups: Group[] = await getGroup({ filter: { parentGroupId: [groupId] } });
	const allUserGroups: UserGroup[] = await getUserGroups();
	const results: User[] = [];

	for (const user of users) {
		let existingUser = allUsers.find((u) => u.phoneNumber == user.phoneNumber);
		if (!existingUser) {
			existingUser = await addUser({ name: user.name || user.phoneNumber, phoneNumber: user.phoneNumber });
			allUsers.push(existingUser);
		}

		let existingCountryGroup = allGroups.find((g) => g.name == user.country && g.parentGroupId == groupId);
		if (!existingCountryGroup && user.country) {
			existingCountryGroup = await addGroup({ name: user.country, parentGroupId: groupId });
			allGroups.push(existingCountryGroup);
		}

		let existingUserGroup = allUserGroups.find(
			(ug) => ug.userId == existingUser.id && ug.groupId == (existingCountryGroup?.id || groupId)
		);

		if (!existingUserGroup) {
			existingUserGroup = await addUserGroup(existingUser.id, existingCountryGroup?.id || groupId);
			allUserGroups.push(existingUserGroup);
		}
		results.push(existingUser);
	}
	return results;
}
