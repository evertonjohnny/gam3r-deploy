"use client";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { useProdutos } from "@/data/hooks/useProdutos";
import { useState } from "react";
export default function Paginacao() {
	const { carregarPagina, qtdePaginas, paginaAtual, setPaginaAtual } =
		useProdutos();

	const formatacaoBotao = cn(
		"flex items-center text-md justify-center",
		"rounded-full border-2 border-sky-700",
		"text-sky-700 hover:bg-sky-700 hover:text-white"
	);

	function trocaPagina(pagina: number) {
		if (pagina < 1 || pagina > qtdePaginas) return;
		carregarPagina(pagina);
		setPaginaAtual(pagina);
	}

	function Item({ numero }: any) {
		return (
			<button
				className={cn("text-zinc-200 font-semibold hover:text-zinc-400", {
					"underline underline-offset-2": numero === paginaAtual,
				})}
				onClick={() => trocaPagina(numero)}
			>
				{numero}
			</button>
		);
	}

	return (
		<div className="flex w-full justify-center px-4 py-6 gap-4">
			<button
				className={formatacaoBotao}
				onClick={() => {
					trocaPagina(paginaAtual - 1);
				}}
			>
				<IconChevronLeft stroke={3} size={18} />
			</button>
			{Array.from({ length: qtdePaginas }, (_, i) => (
				<Item numero={i + 1} key={i} />
			))}
			<button
				className={formatacaoBotao}
				onClick={() => {
					trocaPagina(paginaAtual + 1);
				}}
			>
				<IconChevronRight stroke={3} size={18} />
			</button>
		</div>
	);
}
