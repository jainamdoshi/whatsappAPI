export type Template = {
	id: number;
	senderContactId: number;
	name: string;
	language: string;
	category: string;
};

export async function getTemplates(): Promise<Template[]> {
	const response = await fetch(`http://localhost:8080/template`);
	return await response.json();
}
