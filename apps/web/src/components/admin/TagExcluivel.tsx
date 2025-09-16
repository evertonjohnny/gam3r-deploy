import { cn } from "@/utils/cn";
import { IconX } from "@tabler/icons-react";

interface TagExcluivelProps {
	texto: string;
	onDelete: () => void;
}

export default function TagExcluivel({ texto, onDelete }: TagExcluivelProps) {
	return (
		<div
			className={cn(
				"flex items-center py-1 px-3",
				"rounded-full text-sm text-white bg-violet-700"
			)}
		>
			<span>{texto}</span>
			<button
				className="ml-1 text-xs hover:bg-pink-600 rounded-full p-1"
				onClick={onDelete}
			>
				<IconX size={14} />
			</button>
		</div>
	);
}
