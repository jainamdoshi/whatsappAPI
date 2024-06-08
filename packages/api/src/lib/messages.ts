import axios from 'axios';
import { WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_USER_ACCESS_TOKEN } from '../config/init';
import { Contact } from '../model/db/schema/users';
import { getContacts } from '../model/users';

export async function sendMessageToContacts(phoneNumbers: string[], templateName: string) {
	// if (!phoneNumbers.length || !templateName) {
	// 	return null;
	// }
	// const users = await getUsers({
	// 	filter: {
	// 		phoneNumber: phoneNumbers
	// 	}
	// });
	// const results = await Promise.all(
	// 	users.map((user) => {
	// 		return sendMessage(user, templateName);
	// 	})
	// );
	// return results;
}

export async function sendMessage(contact: Contact, templateName: string) {
	const url = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

	const requestHeaders = {
		Authorization: `Bearer ${WHATSAPP_USER_ACCESS_TOKEN}`,
		'Content-Type': 'application/json'
	};

	const requestBody = {
		messaging_product: 'whatsapp',
		to: contact.phoneNumber,
		type: 'template',
		template: {
			name: templateName,
			language: {
				code: 'en_US'
			}
		}
	};

	const response = await axios.post(url, requestBody, { headers: requestHeaders });
	return response.data;
}
