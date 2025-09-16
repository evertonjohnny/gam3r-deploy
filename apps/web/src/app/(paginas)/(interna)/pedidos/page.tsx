"use client";
import { IconShoppingBag } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useAPI from "@/data/hooks/useAPI";
import { Pedido } from "@gstore/core";
import PedidoCard from "@/components/pedido/PedidoCard";
import Botao from "@/components/shared/Botao";
import Loader from "@/components/template/Loader";
import PedidoNaoEncontrado from "@/components/pedido/PedidoNaoEncontrado";
export default function Pedidos() {
	const [pedidos, setPedidos] = useState<Pedido[] | null>(null);
	const [pagina, setPagina] = useState(1);
	const [fim, setFim] = useState(false);
	const { httpGet } = useAPI();
	const iniciou = useRef(false);

	const fetchPedidos = useCallback(async (pagina: number) => {
		const resposta = await httpGet(`/pedidos?p=${pagina}`);
		if (resposta.length === 0) {
			setFim(true);
		}
		setPedidos((pedidosAnteriores) => {
			if (!pedidosAnteriores) {
				return resposta;
			}
			return [...pedidosAnteriores, ...resposta];
		});
		setPagina(pagina + 1);
	}, []);

	useEffect(() => {
		if (!iniciou.current) {
			fetchPedidos(pagina);
			iniciou.current = true;
		}
	}, [fetchPedidos]);

	if (!pedidos) {
		return <Loader />;
	}

	return (
		<div className="container py-10">
			<h2 className="text-2xl font-bold mb-5 flex items-center gap-1">
				<IconShoppingBag size={35} className="mr-1" /> Meus Pedidos
			</h2>
			{!pedidos.length && <PedidoNaoEncontrado />}
			{pedidos?.map((pedido) => <PedidoCard pedido={pedido} key={pedido.id} />)}
			{!fim && (
				<Botao
					className="lg:w-1/2 text-xl p-5 font-semibold mt-5 mx-auto"
					onClick={() => fetchPedidos(pagina)}
				>
					Carregar Mais Pedidos
				</Botao>
			)}
		</div>
	);
}
