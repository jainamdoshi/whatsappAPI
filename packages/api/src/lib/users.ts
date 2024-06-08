import { Group } from '../model/db/schema/groups';
import { ContactGroup } from '../model/db/schema/userGroups';
import { Contact } from '../model/db/schema/users';
import { addGroup, addContactGroup, getGroup, getContactGroups } from '../model/groups';
import { addContact, getContacts } from '../model/users';
import { RawContactData } from './csvLoader';

export async function parseRawContactData(contacts: RawContactData[], groupId: number) {
	const allContacts: Contact[] = await getContacts();
	const allGroups: Group[] = await getGroup({ filter: { parentGroupId: [groupId] } });
	const allContactGroups: ContactGroup[] = await getContactGroups();
	const results: Contact[] = [];

	for (const contact of contacts) {
		let existingContact = allContacts.find((u) => u.phoneNumber == contact.phoneNumber);
		if (!existingContact) {
			existingContact = await addContact({
				name: contact.name || contact.phoneNumber,
				phoneNumber: contact.phoneNumber
			});
			allContacts.push(existingContact);
		}

		let existingCountryGroup = allGroups.find((g) => g.name == contact.country && g.parentGroupId == groupId);
		if (!existingCountryGroup && contact.country) {
			existingCountryGroup = await addGroup({ name: contact.country, parentGroupId: groupId });
			allGroups.push(existingCountryGroup);
		}

		let existingContactGroup = allContactGroups.find(
			(ug) => ug.contactId == existingContact.id && ug.groupId == (existingCountryGroup?.id || groupId)
		);

		if (!existingContactGroup) {
			existingContactGroup = await addContactGroup(existingContact.id, existingCountryGroup?.id || groupId);
			allContactGroups.push(existingContactGroup);
		}
		results.push(existingContact);
	}
	return results;
}
