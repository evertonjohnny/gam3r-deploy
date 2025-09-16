import { cn } from "@/utils/cn";

interface BotaoProps {
	onClick: (e?: any) => void;
	children: any;
	className?: string;
}

export default function Botao({ onClick, children, className }: BotaoProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"flex justify-center items-center gap-2",
				"bg-violet-700 border-2 border-violet-700",
				"hover:border-emerald-500 rounded-full",
				"h-8 p-3",
				className
			)}
		>
			{children}
		</button>
	);
}
