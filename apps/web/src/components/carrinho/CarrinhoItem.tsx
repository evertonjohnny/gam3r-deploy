import { cn } from "@/utils/cn";
import { ItemCarrinho, Moeda } from "@gstore/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import useParcelamento from "@/data/hooks/useParcelamento";
interface CarrinhoItemProps {
	item: ItemCarrinho;
	adicionarItem: () => void;
	removerItem: () => void;
	removerProduto: () => void;
}

export default function CarrinhoItem({
	item,
	removerItem,
	adicionarItem,
	removerProduto,
}: CarrinhoItemProps) {
	const { produto, quantidade } = item;
	const parcelamento = useParcelamento(produto.precoPromocional);
	return (
		<div className="flex flex-col lg:flex-row items-center bg-violet-dark px-8 py-3 rounded-xl gap-3 lg:gap-16">
			<Image
				src={produto.imagem}
				width={200}
				height={200}
				alt={`Imagem do produto ${produto.nome}`}
			/>
			<div className="flex flex-col h-28 flex-1">
				<span className="text-xl text-center md:text-left">{produto.nome}</span>
			</div>
			<div className="flex flex-col items-center gap-4">
				<span className="text-sm text-zinc-400"> Quantidade</span>
				<div className="flex items-center border border-zinc-300 rounded-lg">
					<button
						disabled={quantidade === 1}
						className={cn("px-2 py-0.5", {
							"text-zinc-500 cursor-not-allowed": quantidade === 1,
						})}
						onClick={removerItem}
					>
						<IconMinus size={15} />
					</button>
					<span className="border-x border-zinc-300 text-lg px-4 py-0.5">
						{quantidade}
					</span>
					<button
						className="px-2 py-0.5 text-emerald-500"
						onClick={adicionarItem}
					>
						<IconPlus size={15} />
					</button>
				</div>
				<button
					className="flex items-center gap-1 text-pink-500 select-none"
					onClick={removerProduto}
				>
					<IconTrash size={20} />
					<span className="text-sm">Remover</span>
				</button>
			</div>
			<div className="flex flex-col items-center lg:items-end">
				<span className="line-through text-zinc-400 text-sm">
					de {Moeda.formatar(produto.precoBase)}
				</span>
				<div className="flex gap-1.5 items-baseline">
					<span className="text-sm">por</span>
					<span className="text-emerald-500 text-xl font-semibold">
						{Moeda.formatar(produto.precoPromocional)}
					</span>
				</div>
				<span className="text-xs text-zinc-300">
					Preço à vista no PIX/Boleto
				</span>
				<span className="text-sm text-zinc-300 mt-4">
					Parcelamento no Cartão
				</span>
				<div className="text-sm text-zinc-300 flex gap-1">
					<span>em até</span>
					<span className="text-white font-semibold">
						{parcelamento.qtdeParcelas}x
					</span>
					<span>de</span>
					<span className="text-white font-semibold">
						{Moeda.formatar(parcelamento.valorParcela)}
					</span>
				</div>
			</div>
		</div>
	);
}
