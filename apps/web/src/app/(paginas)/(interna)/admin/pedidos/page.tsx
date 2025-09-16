"use client";
import TituloPagina from "@/components/admin/TituloPagina";
import { Pedido } from "@gstore/core";
import { IconShoppingBag } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useAPI from "@/data/hooks/useAPI";
import Loader from "@/components/template/Loader";
import PedidoNaoEncontrado from "@/components/pedido/PedidoNaoEncontrado";
import CardPedidoAdmin from "@/components/admin/CardPedidoAdmin";
import Botao from "@/components/shared/Botao";
export default function PedidosAdmin() {
	const [pedidos, setPedidos] = useState<Pedido[] | null>(null);
	const [fim, setFim] = useState(false);
	const [pagina, setPagina] = useState(1);
	const { httpGet } = useAPI();
	const iniciou = useRef(false);

	const fetchPedidosAdmin = useCallback(async (pagina: number) => {
		const resposta = await httpGet(`/pedidos/admin?p=${pagina}`);
		if (resposta.length === 0) {
			setFim(true);
			return;
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
			fetchPedidosAdmin(pagina);
			iniciou.current = true;
		}
	}, []);

	if (!pedidos) {
		return <Loader />;
	}
	return (
		<div className="flex flex-col items-center justify-center md:px-4">
			<TituloPagina texto="Pedidos" icone={IconShoppingBag} />
			{!pedidos.length && <PedidoNaoEncontrado />}
			{!!pedidos.length && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
					{pedidos.map((pedido) => (
						<CardPedidoAdmin pedido={pedido} key={pedido.id} />
					))}
				</div>
			)}
			{!fim && (
				<Botao
					className="text-xl p-4 py-5 font-semibold mt-5 mx-auto lg:w-1/2"
					onClick={() => fetchPedidosAdmin(pagina)}
				>
					Carregar Mais Pedidos
				</Botao>
			)}
		</div>
	);
}
