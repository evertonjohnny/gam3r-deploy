import { cn } from "@/utils/cn";
import Botao from "../shared/Botao";
import { IconAlertCircle } from "@tabler/icons-react";
import Select from "../shared/Select";
import { useState } from "react";
import { Pedido, Status } from "@gstore/core";
import useAPI from "@/data/hooks/useAPI";
interface PopupEditarPedidoProps {
	pedido: Pedido;
	setMostrarPopup: (b: boolean) => void;
}

export default function PopupEditarPedido({
	setMostrarPopup,
	pedido,
}: PopupEditarPedidoProps) {
	const [status, setStatus] = useState<string>(pedido.status);
	const { httpPatch } = useAPI();

	async function editarPedido() {
		const sucesso = await httpPatch(`/pedidos/${pedido.id}`, {
			status,
		});
		if (sucesso) {
			pedido.status = status as Status;
			setMostrarPopup(false);
		}
	}

	return (
		<div
			className={cn(
				"absolute inset-0 bg-black/70 backdrop-blur-sm",
				"z-10 flex items-center justify-center"
			)}
		>
			<div className="bg-violet-700 border-2 border-emerald-500 rounded-xl p-6 m-4 shadow-lg">
				<span className="text-zinc-200 mb-2 flex items-center gap-2">
					<IconAlertCircle size={20} />
					Selecione o status do pedido:
				</span>
				<Select
					texto="Selecione o status"
					className="rounded-lg px-4 py-2 my-2 w-full bg-violet-900 text-zinc-200 border-2 border-emerald-500"
					valor={status}
					setValor={setStatus}
					opcoes={Object.values(Status)}
				/>
				<div className="flex gap-2 items-center justify-between mt-2">
					<Botao
						className="bg-emerald-800 border-emerald-800 hover:bg-emerald-700 py-4 w-full"
						onClick={() => editarPedido()}
					>
						Editar
					</Botao>

					<Botao
						className="bg-sky-800 border-sky-800 hover:bg-sky-700 hover:border-sky-500 py-4 w-full"
						onClick={() => setMostrarPopup(false)}
					>
						Cancelar
					</Botao>
				</div>
			</div>
		</div>
	);
}
