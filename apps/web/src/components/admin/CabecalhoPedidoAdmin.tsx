import { cn } from "@/utils/cn";
import { Status } from "@gstore/core";

interface CabecalhoPedidoAdminProps {
	status: Status;
	pedidoId: number;
}

export default function CabecalhoPedidoAdmin({
	status,
	pedidoId,
}: CabecalhoPedidoAdminProps) {
	const coresStatus = {
		[Status.EM_PREPARACAO]: "text-orange-400",
		[Status.EM_TRANSPORTE]: "text-sky-400",
		[Status.ENTREGUE]: "text-emerald-400",
		[Status.RECEBIDO]: "text-violet-400",
	};

	const corTexto = coresStatus[status];
	return (
		<div
			className={cn(
				"flex flex-col lg:flex-row items-center justify-between ",
				"flex-wrap my-auto mt-5 "
			)}
		>
			<div className="font-semibold text-xl">
				<span className="text-zinc-200">Pedido</span>
				<span className="text-emerald-400 font-bold mx-2">#{pedidoId}</span>
			</div>
			<div
				className={cn(
					"flex flex-col lg:flex-row items-center lg:items-start",
					"gap-2 text-zinc-400 font-bold mt-2 md:mt-0"
				)}
			>
				<span>Status:</span>
				<span className={cn("uppercase font-semibold", corTexto)}>
					{status}
				</span>
			</div>
		</div>
	);
}
