import { Pedido } from "@gstore/core";
import { cn } from "@/utils/cn";
import CabecalhoPedidoAdmin from "./CabecalhoPedidoAdmin";
import Botao from "../shared/Botao";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import PopupEditarPedido from "./PopupEditarPedido";

interface CardPedidoAdminProps {
	pedido: Pedido;
}

export default function CardPedidoAdmin({ pedido }: CardPedidoAdminProps) {
	const [mostrarPopup, setMostrarPopup] = useState(false);
	return (
		<div
			className={cn(
				"flex flex-col my-3 px-6 sm:px-10 md:px-14 py-5",
				"bg-violet-dark rounded-md",
				"border border-white/10 relative"
			)}
		>
			{mostrarPopup && (
				<PopupEditarPedido pedido={pedido} setMostrarPopup={setMostrarPopup} />
			)}
			<CabecalhoPedidoAdmin pedidoId={pedido.id} status={pedido.status} />
			<div className="flex flex-col w-full">
				<ul className="my-5 font-medium">
					{pedido.itens.map((item) => (
						<li className="my-1" key={item.produto.id}>
							{item.produto.nome}
						</li>
					))}
				</ul>
				<div className="flex-1 flex flex-col gap-1 text-left w-full">
					<span className="text-lg font-medium">
						Pedido em
						<span className="text-emerald-400 mx-1">
							{new Date(pedido.dataCompra).toLocaleDateString("pt-BR")}
						</span>
					</span>
					<span className="break-words w-full">
						{`Será entregue em ${pedido.cidade}, ${pedido.estado} (${pedido.complemento}), ${pedido.logradouro} ${pedido.numero}`}
					</span>
				</div>
			</div>
			<Botao
				className="my-3"
				onClick={() => {
					setMostrarPopup(true);
				}}
			>
				<IconPencil /> Editar
			</Botao>
		</div>
	);
}
