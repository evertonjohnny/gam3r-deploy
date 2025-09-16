"use client";
import { cn } from "@/utils/cn";
import { useCarrinho } from "@/data/hooks/useCarrinho";
import { FormaPagamento, Moeda } from "@gstore/core";
import Botao from "../shared/Botao";
import { IconCreditCard } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ResumoPagamento() {
	const {
		formaPagamento,
		valorTotalCheio,
		valorTotal,
		parcelamento,
		finalizarCompra,
	} = useCarrinho();

	const textoFormaPagamento = {
		[FormaPagamento.BOLETO]: "Boleto",
		[FormaPagamento.PIX]: "PIX",
		[FormaPagamento.CREDITO]: "Cartão de Crédito",
	};

	const router = useRouter();
	return (
		<div
			className={cn(
				"flex flex-col self-start gap-3",
				"w-full max-w-96 px-6 py-8 mx-auto",
				"bg-violet-dark rounded-xl"
			)}
		>
			<span className="text-xl font-semibold"> Resumo</span>
			<div className="flex justify-between">
				<span className="text-zinc-400">Forma de Pagamento:</span>
				<span>{textoFormaPagamento[formaPagamento]}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-zinc-400">Valor Total:</span>
				<span className="text-emerald-500 font-semibold">
					{Moeda.formatar(valorTotalCheio)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-zinc-400">Desconto:</span>
				<span className="text-red-500 font-semibold">
					-{Moeda.formatar(valorTotalCheio - valorTotal)}
				</span>
			</div>
			<div className="flex flex-col items-end mt-2">
				<span className="text-zinc-400"> à vista no PIX/Boleto</span>
				<span className="text-emerald-500 font-semibold text-2xl">
					{Moeda.formatar(valorTotal)}
				</span>
			</div>
			<div className="flex flex-col items-end">
				<span className="text-zinc-300 text-sm mt-2">
					{" "}
					Parcelamento no Cartão
				</span>
				<div className="flex gap-1 text-sm text-zinc-300">
					<span>Em até</span>
					<span className="text-white font-semibold">
						{parcelamento.qtdeParcelas}x
					</span>
					<span>de</span>
					<span className="text-white font-semibold">
						{Moeda.formatar(parcelamento.valorParcela)}
					</span>
				</div>
			</div>
			<Botao
				onClick={async () => {
					const sucesso = await finalizarCompra();
					if (sucesso) {
						router.push("/checkout/sucesso");
					}
				}}
				className="bg-indigo-700 border-indigo-700 mt-7"
			>
				<IconCreditCard size={20} />
				<span>Finalizar Compra</span>
			</Botao>
		</div>
	);
}
