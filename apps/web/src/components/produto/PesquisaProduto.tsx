"use client";
import { cn } from "@/utils/cn";
import { IconSearch } from "@tabler/icons-react";
import { useProdutos } from "@/data/hooks/useProdutos";

export default function PesquisaProduto() {
	const { pesquisa, setPesquisa, buscaProdutos } = useProdutos();
	return (
		<div
			className={cn(
				"flex gap-2 bg-violet-dark border border-white/20 ",
				"rounded-full overflow-hidden"
			)}
		>
			<input
				value={pesquisa}
				onChange={(e: any) => setPesquisa(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						buscaProdutos();
					}
				}}
				className="flex-1 bg-transparent outline-none pl-2 py-2 sm:px-6 sm:py-3"
				placeholder="O que você procura?"
			></input>
			<button
				onClick={() => buscaProdutos()}
				className="flex justify-center items-center bg-emerald-500 px-2 sm:px-4"
			>
				<IconSearch size={24} className="text-white" />
			</button>
		</div>
	);
}
