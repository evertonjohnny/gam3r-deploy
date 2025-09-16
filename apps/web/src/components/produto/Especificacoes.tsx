import { Produto } from "@gstore/core";
import Tag from "../shared/Tag";
import { IconTag } from "@tabler/icons-react";

interface EspecificacoesProps {
	produto: Produto;
}

export default function Especificacoes({ produto }: EspecificacoesProps) {
	return (
		<div className="flex-1 flex flex-col gap-1 w-full">
			<div className="flex mb-3">
				<Tag texto={produto.especificacoes.destaque} outlined icone={IconTag} />
			</div>
			{Object.keys(produto.especificacoes)
				.filter((chave: string) => chave !== "destaque")
				.map((chave: string) => (
					<div key={chave} className="flex gap-1">
						<span className="p-2 w-1/2 md:w-1/3 bg-white/5 rounded break-all sm:break-words">
							{chave}
						</span>
						<span className="p-2 w-1/2 md:w-2/3 bg-white/5 rounded break-all sm:break-words">
							{produto.especificacoes[chave]}
						</span>
					</div>
				))}
		</div>
	);
}
