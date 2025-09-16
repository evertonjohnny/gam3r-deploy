import { cn } from "@/utils/cn";
import { Moeda, Produto } from "@gstore/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import Botao from "../shared/Botao";
import { useState } from "react";
import PopupExluir from "./PopupExcluir";
import { useProdutos } from "@/data/hooks/useProdutos";

interface ProdutoAdminProps {
	produto: Produto;
}

export default function CardProdutoAdmin({ produto }: ProdutoAdminProps) {
	const [exibirExcluir, setExibirExcluir] = useState(false);
	const { deletarProdutoPorId } = useProdutos();

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center relative",
				"bg-violet-dark/40 border border-white/20",
				"rounded-2xl shadow-2xl py-6 px-2 overflow-hidden h-96"
			)}
		>
			{exibirExcluir && (
				<PopupExluir
					setExibirExcluir={setExibirExcluir}
					produto={produto}
					excluir={() => {
						deletarProdutoPorId(produto.id);
					}}
				/>
			)}
			<Image
				src={produto.imagem}
				width={160}
				height={160}
				alt={`Imagem de ${produto.nome}`}
			/>
			<div className="flex flex-col items-center gap-2 my-3">
				<span className="text-lg font-bold break-normal text-violet-200 text-center mb-1">
					{produto.nome}
				</span>
				<span className="text-violet-200 font-semibold">
					Preço atual:
					<span className="mx-1 text-md text-emerald-500 font-bold">
						{Moeda.formatar(
							produto.precoPromocional
								? produto.precoPromocional
								: produto.precoBase
						)}
					</span>
				</span>
			</div>
			<div className="flex-1"></div>
			<div className="flex justify-center gap-4 mt-2 mb-1 px-4">
				<Link
					href={`/admin/produtos/${produto.id}`}
					className="botao border-2 bg-violet-700 border-violet-700 px-4 hover:bg-violet-800 hover:border-emerald-500"
				>
					<IconEdit size={20} />
					<span>Editar</span>
				</Link>
				<Botao
					className="bg-pink-700 border-pink-700 hover:bg-pink-800 hover:border-emerald-500 py-4"
					onClick={() => setExibirExcluir(true)}
				>
					<IconTrash size={20} /> <span>Excluir</span>
				</Botao>
			</div>
		</div>
	);
}
