import { cn } from "@/utils/cn";
import { ItemPedido } from "@gstore/core";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImagensPedidoProps {
	itens: ItemPedido[];
}

export default function ImagensPedido({ itens }: ImagensPedidoProps) {
	const [indice, setIndice] = useState(0);

	useEffect(() => {
		const intervalo = setInterval(() => {
			setIndice((indiceAnterior) => (indiceAnterior + 1) % itens.length);
		}, 2000);

		return () => clearInterval(intervalo);
	}, []);
	return (
		<div className="h-44 w-44">
			{itens.map((item, i) => {
				return (
					<Image
						key={item.id}
						src={item.produto.imagem}
						alt={`Imagem de ${item.produto.nome}`}
						width={200}
						height={200}
						className={cn(
							"object-cover w-44 h-44 rounded-md",
							"transition-opacity duration-500 absolute",
							{ "opacity-100": indice === i, "opacity-0": indice !== i }
						)}
					/>
				);
			})}
		</div>
	);
}
