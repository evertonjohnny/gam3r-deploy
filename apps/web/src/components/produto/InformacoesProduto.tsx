import { Produto } from "@gstore/core";
import Image from "next/image";
import Especificacoes from "./Especificacoes";

interface InformacoesProdutoProps {
	produto: Produto;
}

export default function InformacoesProduto({
	produto,
}: InformacoesProdutoProps) {
	return (
		<div className="flex flex-col lg:flex-row items-center bg-violet-dark rounded-xl p-5 ">
			<div className="flex justify-center">
				<Image
					src={produto.imagem}
					width={400}
					height={400}
					className="object-cover p-7"
					alt={`Imagem do ${produto.nome}`}
				/>
			</div>
			<Especificacoes produto={produto} />
		</div>
	);
}
