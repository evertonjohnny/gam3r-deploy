import { cn } from "@/utils/cn";
import { Pedido, Status } from "@gstore/core";
import CabecalhoPedidoCard from "./CabecalhoPedidoCard";
import ImagensPedido from "./ImagensPedido";
import ListaProdutos from "./ListaProdutos";
import InformacoesEntrega from "./InformacoesEntrega";
interface PedidoCardProps {
	pedido: Pedido;
}

export default function PedidoCard({ pedido }: PedidoCardProps) {
	return (
		<div
			className={cn(
				"flex flex-col my-3 px-14 py-5",
				"bg-violet-dark rounded-md",
				"border border-white/10"
			)}
		>
			<CabecalhoPedidoCard pedidoId={pedido.id} status={pedido.status} />
			<div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
				<ImagensPedido itens={pedido.itens} />
				<ListaProdutos itens={pedido.itens} qtdeExibiveis={4} />
				<InformacoesEntrega pedido={pedido} />
			</div>
		</div>
	);
}
