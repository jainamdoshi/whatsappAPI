export class EventNotification {
	entry: EventEntry[];
	object: string;

	constructor(entry: EventEntry[], object: string) {
		this.entry = entry;
		this.object = object;
	}
}

class EventEntry {
	uid: string;
	time: number;
	changes: EventChange[];

	constructor(uid: string, time: number, changes: EventChange[]) {
		this.uid = uid;
		this.time = time;
		this.changes = changes;
	}
}

class EventChange {
	value: any;
	field: string;

	constructor(value: any, field: string) {
		this.value = value;
		this.field = field;
	}
}

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
