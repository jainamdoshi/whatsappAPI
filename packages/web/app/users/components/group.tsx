import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Group } from '@/server/group/action';
import Link from 'next/link';

export default function ContactGroup({ group }: { group: Group }) {
	if (!group.subGroup.length) {
		return (
			<div className='space-y-1 px-4 py-2'>
				<Link href={`/contacts/${group.id}`}>{group.name}</Link>
			</div>
		);
	}

	return (
		<Accordion type='single' collapsible>
			<AccordionItem value={group.id.toString()}>
				<AccordionTrigger className='flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
					<div>
						{group.name} <span>({group.subGroup.length})</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className='px-2'>
					{group.subGroup.map((subGroup) => (
						<ContactGroup key={subGroup.id} group={subGroup} />
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
