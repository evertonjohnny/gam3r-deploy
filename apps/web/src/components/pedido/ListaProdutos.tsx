import { ItemPedido } from "@gstore/core";
import Link from "next/link";

interface ListaProdutosProps {
	itens: ItemPedido[];
	qtdeExibiveis: number;
}

export default function ListaProdutos({
	itens,
	qtdeExibiveis,
}: ListaProdutosProps) {
	const qtde = qtdeExibiveis <= itens.length ? qtdeExibiveis : itens.length;
	const itensExibiveis = itens.slice(0, qtde);
	const itensRestantes = itens.length - qtde;
	return (
		<ul className="mx-4 font-medium">
			{itensExibiveis.map((item) => {
				return (
					<li key={item.id} className="my-2">
						<Link
							href={`/produtos/${item.produto.id}`}
							className="hover:text-emerald-500 hover:underline"
						>
							{item.produto.nome}
						</Link>
					</li>
				);
			})}
			{itensRestantes > 0 && (
				<li className="text-zinc-400 italic">
					+ {itensRestantes} itens no pedido
				</li>
			)}
		</ul>
	);
}
