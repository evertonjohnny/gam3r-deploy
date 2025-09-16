"use client";
import { cn } from "@/utils/cn";
import { FormaPagamento } from "@gstore/core";
import { useCarrinho } from "@/data/hooks/useCarrinho";

interface OpcoesPagamento {
	texto: string;
	formaPagamento: FormaPagamento;
}

export default function SelecaoFormaPagamento() {
	const { formaPagamento, alterarFormaPagamento } = useCarrinho();
	const opcoes: OpcoesPagamento[] = [
		{ texto: "Pagamento no PIX", formaPagamento: FormaPagamento.PIX },
		{ texto: "Boleto Bancário", formaPagamento: FormaPagamento.BOLETO },
		{ texto: "Cartão de Crédito", formaPagamento: FormaPagamento.CREDITO },
	];
	return (
		<div className="flex flex-col gap-3">
			<span className="px-7 pb-2 text-xl font-bold text-white/70">
				Forma de Pagamento
			</span>
			<div className="flex flex-col gap-3">
				{opcoes.map((opcao) => {
					const selecionado = opcao.formaPagamento === formaPagamento;
					return (
						<button
							key={opcao.formaPagamento}
							className={cn(
								"flex items-center gap-3",
								"bg-violet-dark rounded-lg h-12 px-7"
							)}
							onClick={() => {
								alterarFormaPagamento(opcao.formaPagamento);
							}}
						>
							<span
								className={cn(
									"bg-transparent border-white",
									"w-5 h-5 border-2 rounded-full",
									{ "bg-emerald-500 border-emerald-500": selecionado }
								)}
							></span>
							<span>{opcao.texto}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
