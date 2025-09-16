import { cn } from "@/utils/cn";
import { Moeda } from "@gstore/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useMensagens } from "@/data/hooks/useMensagens";
import { useAutenticacao } from "@/data/hooks/useAutenticacao";
import Botao from "../shared/Botao";
import { useRouter } from "next/navigation";

interface TotalCarrinhoProps {
	qtdeDeItens: number;
	valorTotal: number;
}

export default function TotalCarrinho({
	qtdeDeItens,
	valorTotal,
}: TotalCarrinhoProps) {
	const { adicionarMensagemErro } = useMensagens();
	const { temCredencial } = useAutenticacao();
	const router = useRouter();
	return (
		<div
			className={cn(
				"flex flex-col md:flex-row justify-end items-center ",
				"gap-3 md:gap-7 min-h-24 h-fit p-6 w-full",
				"bg-violet-dark rounded-xl px-7"
			)}
		>
			<div className="text-zinc-400 flex flex-col ">
				<span>
					Total {qtdeDeItens} {qtdeDeItens > 1 ? "itens" : "item"}
				</span>
				<span className="text-emerald-500 text-2xl font-semibold">
					{Moeda.formatar(valorTotal)}
				</span>
			</div>
			<Botao
				className={cn(
					"bg-indigo-700 border-indigo-700",
					"hover:bg-indigo-800 hover:border-indigo-800",
					"px-9 h-9 font-semibold"
				)}
				onClick={() => {
					if (qtdeDeItens === 0) {
						adicionarMensagemErro("O seu carrinho está vazio");
						return;
					}
					if (!temCredencial()) {
						adicionarMensagemErro("Você precisa fazer login para continuar");
						return;
					}
					router.push("/checkout/pagamento");
				}}
			>
				<IconShoppingCart size={20} />
				<span>Continuar</span>
			</Botao>
		</div>
	);
}
