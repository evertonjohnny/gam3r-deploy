import { cn } from "@/utils/cn";
import Link from "next/link";

interface LinkCheckoutProps {
	selecionado?: boolean;
	indice: number;
	caminho: string;
	texto: string;
}

export default function LinkCheckout({
	selecionado,
	indice,
	caminho,
	texto,
}: LinkCheckoutProps) {
	return (
		<Link
			href={caminho}
			className={cn("flex items-center gap-2 cursor-pointer", {
				"text-pink-500 ": selecionado,
				"text-zinc-400": !selecionado,
			})}
		>
			<span
				className={cn(
					"flex justify-center items-center",
					"text-sx font-bold w-5 h-5 rounded-full",
					{
						"bg-pink-500 text-white": selecionado,
						"bg-zinc-400 text-black": !selecionado,
					}
				)}
			>
				{indice}
			</span>
			<span>{texto}</span>
		</Link>
	);
}
