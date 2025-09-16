import DadosEntrega from "@/components/pagamento/DadosEntrega";
import SelecaoFormaPagamento from "@/components/pagamento/SelecaoFormaPagamento";
import CabecalhoCheckout from "@/components/shared/CabecalhoCheckout";
import ResumoPagamento from "@/components/pagamento/ResumoPagamento";
export default function Pagamento() {
	return (
		<div className="flex flex-col gap-7 container">
			<CabecalhoCheckout passo="pagamento" />
			<div className="flex flex-col lg:flex-row gap-5 items-center">
				<div className="flex flex-1 flex-col gap-5 w-full">
					<SelecaoFormaPagamento />
					<DadosEntrega />
				</div>
				<ResumoPagamento />
			</div>
		</div>
	);
}
