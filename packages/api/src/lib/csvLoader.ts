import { readFileSync } from 'fs';
import { parse } from 'csv-parse';

export type RawUserData = {
	status?: string;
	status2?: string;
	country?: string;
	name: string;
	phoneNumber: string;
	companyName?: string;
	email?: string;
	email2?: string;
};

export async function loadUserDataFromCSV(fileName: string) {
	const users: RawUserData[] = [];

	const columns = ['status', 'status2', 'country', 'name', 'phoneNumber', 'companyName', 'email', 'email2'];

	const data = readFileSync(fileName, 'utf8');
	const parser = parse(data, {
		delimiter: ',',
		columns: columns
	});

	for await (const user of parser) {
		if (user.phoneNumber && user.phoneNumber.trim() !== '') {
			columns.map((key) => {
				user[key] = user[key].trim();
				if (user[key] === '') {
					delete user[key];
				}
			});
			users.push(user);
		}
	}
	return users;
}
