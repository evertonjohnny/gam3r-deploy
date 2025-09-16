import LinkCheckout from "./LinkCheckout";

interface CabecalhoCheckoutProps {
	passo: "carrinho" | "pagamento";
}

export default function CabecalhoCheckout({ passo }: CabecalhoCheckoutProps) {
	return (
		<div className="mt-5 flex justify-center items-center gap-6 h-20 select-none">
			<LinkCheckout
				selecionado={passo === "carrinho"}
				texto="Carrinho"
				indice={1}
				caminho="/carrinho"
			/>
			<div className="bg-zinc-300 h-px w-12"></div>
			<LinkCheckout
				selecionado={passo === "pagamento"}
				texto="Pagamento"
				indice={2}
				caminho="/checkout/pagamento"
			/>
		</div>
	);
}
