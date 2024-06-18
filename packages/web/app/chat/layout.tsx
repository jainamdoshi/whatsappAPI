import MessengerProvider from '@/providers/messengerProvider';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<MessengerProvider>{children}</MessengerProvider>
		</div>
	);
}
