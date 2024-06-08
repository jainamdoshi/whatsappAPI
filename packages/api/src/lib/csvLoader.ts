import { readFileSync } from 'fs';
import { parse } from 'csv-parse';

export type RawContactData = {
	status?: string;
	status2?: string;
	country?: string;
	name: string;
	phoneNumber: string;
	companyName?: string;
	email?: string;
	email2?: string;
};

export async function loadContactDataFromCSV(fileName: string) {
	const contacts: RawContactData[] = [];

	const columns = ['status', 'status2', 'country', 'name', 'phoneNumber', 'companyName', 'email', 'email2'];

	const data = readFileSync(fileName, 'utf8');
	const contactParser = parse(data, {
		delimiter: ',',
		columns: columns
	});

	for await (const contact of contactParser) {
		if (contact.phoneNumber && contact.phoneNumber.trim() !== '') {
			columns.map((key) => {
				contact[key] = contact[key].trim();
				if (contact[key] === '') {
					delete contact[key];
				}
			});
			contacts.push(contact);
		}
	}
	return contacts;
}
