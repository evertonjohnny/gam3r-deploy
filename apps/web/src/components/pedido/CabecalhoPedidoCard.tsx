import { cn } from "@/utils/cn";
import { Status } from "@gstore/core";

interface CabecalhoPedidoCardProps {
	status: Status;
	pedidoId: number;
}

export default function CabecalhoPedidoCard({
	status,
	pedidoId,
}: CabecalhoPedidoCardProps) {
	const textoCorStatus = {
		RECEBIDO: "text-violet-400",
		EM_PREPARACAO: "text-orange-400",
		EM_TRANSPORTE: "text-sky-400",
		ENTREGUE: "text-emerald-400",
	};

	const corTexto = textoCorStatus[status];
	return (
		<div
			className={cn(
				"flex flex-col lg:flex-row items-center lg:items-start justify-between",
				"mt-5 rounded-md bg-violet-dark"
			)}
		>
			<div>
				<span className="text-zinc-200 font-semibold text-xl">Pedido</span>
				<span className="text-emerald-400 font-bold mx-2">#{pedidoId}</span>
			</div>
			<div className="flex flex-col lg:flex-row items-center lg:items-start gap-2">
				<div className="text-zinc-400 flex flex-col lg:flex-row items-center gap-2">
					<span className="text-center font-bold">Status:</span>
				</div>
				<div className={`${corTexto} font-semibold`}>
					<span className="hidden lg:inline mx-1">|</span>
					<span className="uppercase">{status}</span>
				</div>
			</div>
		</div>
	);
}
