export type SenderContact = {
	id: number;
	name: string;
	phoneNumber: string;
	whatsAppPhoneNumberId: number;
};

export async function getSenderContacts(): Promise<SenderContact[]> {
	const response = await fetch(`http://localhost:8080/senderContact`);
	return await response.json();
}
