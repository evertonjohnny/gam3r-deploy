import { IconShoppingBag } from "@tabler/icons-react";

export default function PedidoNaoEncontrado() {
	return (
		<div className="flex-1 flex flex-col justify-center items-center text-violet-300 my-20">
			<IconShoppingBag size={180} stroke={0.3} />
			<span className="text-violet-300">Nenhum pedido encontrado</span>
		</div>
	);
}
