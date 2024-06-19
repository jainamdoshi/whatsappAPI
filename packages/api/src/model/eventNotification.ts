export class WhatsAppEventNotification {
	entry: WhatsAppEventEntry[];
	object: string;

	constructor(entry: WhatsAppEventEntry[], object: string) {
		this.entry = entry;
		this.object = object;
	}
}

class WhatsAppEventEntry {
	uid: string;
	time: number;
	changes: WhatsAppEventChange[];

	constructor(uid: string, time: number, changes: WhatsAppEventChange[]) {
		this.uid = uid;
		this.time = time;
		this.changes = changes;
	}
}

export type WhatsAppEventChangeValue = {
	messaging_product: 'whatsapp';
	metadata: WhatsAppMetadataChange;
	contacts?: WhatsAppContact[];
	messages?: WhatsAppMessage[];
	statuses?: WhatsAppStatus[];
};

class WhatsAppEventChange {
	value: WhatsAppEventChangeValue;
	field: string;

	constructor(value: WhatsAppEventChangeValue, field: string) {
		this.value = value;
		this.field = field;
	}
}

class WhatsAppMetadataChange {
	displayPhoneNumber: string;
	phoneNumberId: string;

	constructor(displayPhoneNumber: string, phoneNumberId: string) {
		this.displayPhoneNumber = displayPhoneNumber;
		this.phoneNumberId = phoneNumberId;
	}
}

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

class WhatsAppStatus {
	id: string;
	status: string;
	timestamp: string;
	recipientId: string;
	conversationId: string;

	constructor(id: string, status: string, timestamp: string, recipientId: string, conversation: { id: string }) {
		this.id = id;
		this.status = status;
		this.timestamp = timestamp;
		this.recipientId = recipientId;
		this.conversationId = conversation.id;
	}
}

// {
// 	"id": "168130179724730",
// 	"changes": [
// 	{
// 		"value": {
// 		"messaging_product": "whatsapp",
// 		"metadata": {
// 			"display_phone_number": "15550315353",
// 			"phone_number_id": "186646801200517"
// 		},
// 		"statuses": [
// 			{
// 			"id": "wamid.HBgMOTcxNTU5OTgxODY0FQIAERgSMDVDMzkzREJBQkYxNTQwOTNDAA==",
// 			"status": "delivered",
// 			"timestamp": "1716308169",
// 			"recipient_id": "971559981864",
// 			"conversation": {
// 				"id": "158e8778a20f301f0b0382bf9cb4696b",
// 				"origin": {
// 					"type": "utility"
// 				}
// 			},
// 			"pricing": {
// 				"billable": true,
// 				"pricing_model": "CBP",
// 				"category": "utility"
// 			}}
// 		]
// 		},
// 		"field": "messages"
// 	}]
// }

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
