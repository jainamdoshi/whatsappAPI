export type TWhatsAppEventNotification = {
	entry: TWhatsAppEventEntry[];
};

export class WhatsAppEventNotification {
	entry: WhatsAppEventEntry[];

	constructor(entries: TWhatsAppEventEntry[]) {
		console.log('New WhatsAppEventNotification', JSON.stringify(entries, null, 2));
		this.entry = entries.map((entry) => new WhatsAppEventEntry(entry.id, entry.changes));
	}
}

type TWhatsAppEventEntry = {
	id: string;
	changes: TWhatsAppEventChange[];
};

class WhatsAppEventEntry {
	id: string;
	changes: WhatsAppEventChange[];

	constructor(id: string, changes: TWhatsAppEventChange[]) {
		this.id = id;
		this.changes = changes.map((change) => new WhatsAppEventChange(change.value, change.field));
	}
}

type TWhatsAppEventChange = {
	value: TWhatsAppEventChangeValue;
	field: string;
};

class WhatsAppEventChange {
	value: WhatsAppEventChangeValue;
	field: string;

	constructor(value: TWhatsAppEventChangeValue, field: string) {
		this.value = new WhatsAppEventChangeValue(value);
		this.field = field;
	}
}

type TWhatsAppEventChangeValue = {
	messaging_product: 'whatsapp';
	metadata: TWhatsAppMetadataChange;
	contacts?: TWhatsAppContact[];
	messages?: TWhatsAppMessage[];
	statuses?: TWhatsAppStatus[];
};

class WhatsAppEventChangeValue {
	messaging_product: 'whatsapp';
	metadata: WhatsAppMetadataChange;
	contacts?: WhatsAppContact[];
	messages?: WhatsAppMessage[];
	statuses?: WhatsAppStatus[];

	constructor(value: TWhatsAppEventChangeValue) {
		this.messaging_product = value.messaging_product;
		this.metadata = new WhatsAppMetadataChange(value.metadata.display_phone_number, value.metadata.phone_number_id);
		this.contacts = value.contacts?.map((contact) => new WhatsAppContact(contact.profile, contact.wa_id));
		this.messages = value.messages?.map(
			(message) => new WhatsAppMessage(message.from, message.timestamp, message.text, message.type)
		);
		this.statuses = value.statuses?.map(
			(status) =>
				new WhatsAppStatus(status.id, status.status, status.timestamp, status.recipient_id, status.conversation)
		);
	}
}

type TWhatsAppMetadataChange = {
	display_phone_number: string;
	phone_number_id: string;
};

export class WhatsAppMetadataChange {
	displayPhoneNumber: string;
	phoneNumberId: string;

	constructor(displayPhoneNumber: string, phoneNumberId: string) {
		this.displayPhoneNumber = displayPhoneNumber;
		this.phoneNumberId = phoneNumberId;
	}
}

type TWhatsAppContact = {
	profile: {
		name: string;
	};
	wa_id: string;
};

class WhatsAppContact {
	profile: {
		name: string;
	};
	waId: string;

	constructor(profile: { name: string }, waId: string) {
		this.profile = profile;
		this.waId = waId;
	}
}

type TextType = 'text' | 'image' | 'video';

type TWhatsAppMessage = {
	from: string;
	id: string;
	timestamp: string;
	text: {
		body: string;
	};
	type: TextType;
};

export class WhatsAppMessage {
	from: string;
	timestamp: string;
	text: {
		body: string;
	};
	type: TextType;

	constructor(from: string, timestamp: string, text: { body: string }, type: TextType) {
		this.from = from;
		this.timestamp = timestamp;
		this.text = text;
		this.type = type;
	}
}

type TWhatsAppStatus = {
	id: string;
	status: string;
	timestamp: string;
	recipient_id: string;
	conversation?: TWhatsAppConversation;
};

class WhatsAppStatus {
	id: string;
	status: string;
	timestamp: string;
	recipientId: string;
	conversation?: WhatsAppConversation;

	constructor(
		id: string,
		status: string,
		timestamp: string,
		recipientId: string,
		conversation?: TWhatsAppConversation
	) {
		this.id = id;
		this.status = status;
		this.timestamp = timestamp;
		this.recipientId = recipientId;
		this.conversation = conversation ? new WhatsAppConversation(conversation.id, conversation.origin) : undefined;
	}
}

type TWhatsAppConversation = {
	id: string;
	origin: {
		type: string;
	};
};

class WhatsAppConversation {
	id: string;
	origin: {
		type: string;
	};

	constructor(id: string, origin: { type: string }) {
		this.id = id;
		this.origin = origin;
	}
}

// {
// 	"id": "168130179724730",
// 	"changes": [
// 	{
// 		"value": {
// 			"messaging_product": "whatsapp",
// 			"metadata": {
// 				"display_phone_number": "15550315353",
// 				"phone_number_id": "186646801200517"
// 			},
// 			"statuses": [
// 			{
// 				"id": "wamid.HBgMOTcxNTU5OTgxODY0FQIAERgSMDVDMzkzREJBQkYxNTQwOTNDAA==",
// 				"status": "delivered",
// 				"timestamp": "1716308169",
// 				"recipient_id": "971559981864",
// 				"conversation": {
// 					"id": "158e8778a20f301f0b0382bf9cb4696b",
// 					"origin": {
// 						"type": "utility"
// 					}
// 				},
// 				"pricing": {
// 					"billable": true,
// 					"pricing_model": "CBP",
// 					"category": "utility"
// 				}
//			}]
//		},
// 		"field": "messages"
//	}]
//}

// [
//   {
//     "id": "168130179724730",
//     "changes": [
//       {
//         "value": {
//           "messaging_product": "whatsapp",
//           "metadata": {
//             "display_phone_number": "15550315353",
//             "phone_number_id": "186646801200517"
//           },
//           "contacts": [
//             {
//               "profile": {
//                 "name": "Jainam"
//               },
//               "wa_id": "61414006212"
//             }
//           ],
//           "messages": [
//             {
//               "from": "61414006212",
//               "id": "wamid.HBgLNjE0MTQwMDYyMTIVAgASGBYzRUIwNzI1NUJGN0I5MUZDNkJFODgzAA==",
//               "timestamp": "1715871968",
//               "text": {
//                 "body": "This is Jainam"
//               },
//               "type": "text"
//             }
//           ]
//         },
//         "field": "messages"
//       }
//     ]
//   }
// ]
