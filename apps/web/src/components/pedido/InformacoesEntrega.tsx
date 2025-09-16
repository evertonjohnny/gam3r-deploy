import { cn } from "@/utils/cn";
import { Pedido } from "@gstore/core";

interface InformacoesEntregaProps {
	pedido: Pedido;
}

export default function InformacoesEntrega({
	pedido,
}: InformacoesEntregaProps) {
	return (
		<div
			className={cn(
				"flex-1 flex flex-col gap-1 text-center lg:text-right",
				"items-center lg:items-end my-5"
			)}
		>
			<span className="text-lg font-medium">
				{" "}
				Pedido em
				<span className="text-emerald-400 mx-1">
					{new Date(pedido.dataCompra).toLocaleDateString("pt-BR")}
				</span>
			</span>
			<span className="text-sm text-zinc-300">
				Total ({pedido.itens.length} itens)
			</span>
			<span className="text-xl font-medium">
				Total:
				<span className="text-emerald-500 mx-2 font-semibold">
					R$ {pedido.valorTotal}
				</span>
			</span>
			<span className="lg:w-1/2">
				{`Será entregue em ${pedido.cidade}, ${pedido.estado} (${pedido.complemento}), ${pedido.logradouro} ${pedido.numero}`}
			</span>
		</div>
	);
}
