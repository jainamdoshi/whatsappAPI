'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSenderContacts, SenderContact } from '@/server/senderContact/actions';
import { getTemplates, Template } from '@/server/template/action';
import { useQuery } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

const senderAtom = atom<number | null>(null);
const templateAtom = atom<number | null>(null);

export function SenderDetails() {
	return (
		<>
			<div className='space-y-2'>
				<Label htmlFor='sender-phone'>Sender Phone</Label>
				<SenderContactSelect />
			</div>
			<div className='space-y-2'>
				<Label htmlFor='message-template'>Message Template</Label>
				<SenderTemplateSelect />
			</div>
		</>
	);
}

function SenderContactSelect() {
	const [_, setSender] = useAtom(senderAtom);

	const { data, isLoading } = useQuery<SenderContact[]>({
		queryKey: ['senderContacts'],
		queryFn: getSenderContacts
	});

	if (isLoading || !data) return null;

	return (
		<Select onValueChange={(value) => setSender(parseInt(value))}>
			<SelectTrigger>
				<SelectValue placeholder='Select sender phone number' />
			</SelectTrigger>
			<SelectContent>
				{data.map((contact) => (
					<SelectItem key={contact.id} value={contact.id.toString()}>
						{contact.phoneNumber}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

function SenderTemplateSelect() {
	const [sender, _] = useAtom(senderAtom);
	const [__, setTemplate] = useAtom(templateAtom);

	const { data, isLoading } = useQuery<Template[]>({
		queryKey: ['templates'],
		queryFn: getTemplates
	});

	if (isLoading || !data) return null;
	const senderTemplates = data.filter((template) => template.senderContactId === sender);

	return (
		<Select disabled={!sender} onValueChange={(value) => setTemplate(parseInt(value))}>
			<SelectTrigger>
				<SelectValue placeholder={!sender ? 'Select sender phone number' : 'Select message template'} />
			</SelectTrigger>
			<SelectContent>
				{senderTemplates.map((template) => (
					<SelectItem key={template.id} value={template.id.toString()}>
						{template.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export function SendMessageButton() {
	const Router = useRouter();
	const [sender, _] = useAtom(senderAtom);
	const [template, __] = useAtom(templateAtom);

	return (
		<Button
			disabled={!sender || !template}
			onClick={() => {
				Router.push('/contacts');
			}}
		>
			Send Message
		</Button>
	);
}
