"use client";
import { useCarrinho } from "@/data/hooks/useCarrinho";
import CarrinhoItem from "@/components/carrinho/CarrinhoItem";
import TotalCarrinho from "@/components/carrinho/TotalCarrinho";
import CabecalhoCheckout from "@/components/shared/CabecalhoCheckout";
import CarrinhoVazio from "@/components/carrinho/CarrinhoVazio";

export default function Carrinho() {
	const {
		itens,
		adicionarItem,
		removerItem,
		removerProduto,
		qtdeDeItens,
		valorTotal,
	} = useCarrinho();
	return (
		<div className="flex flex-col gap-5 container">
			<CabecalhoCheckout passo="carrinho" />
			{itens.length < 1 && <CarrinhoVazio />}
			<div className="flex flex-col gap-4">
				{itens.map((item) => (
					<CarrinhoItem
						item={item}
						key={item.produto.id}
						adicionarItem={() => adicionarItem(item.produto)}
						removerItem={() => removerItem(item.produto)}
						removerProduto={() => removerProduto(item.produto)}
					/>
				))}
			</div>
			<TotalCarrinho qtdeDeItens={qtdeDeItens} valorTotal={valorTotal} />
		</div>
	);
}
