"use client";
import { useState, use } from "react";
import { useEffect } from "react";
import TituloProduto from "@/components/produto/TituloProduto";
import InformacoesProduto from "@/components/produto/InformacoesProduto";
import BannerCompra from "@/components/produto/BannerCompra";
import MedidorDePreco from "@/components/produto/MedidorDePreco";
import AvaliacoesUsuarios from "@/components/produto/AvaliacoesUsuarios";
import AvaliacaoEspecializada from "@/components/produto/AvaliacaoEspecializada";
import ProdutoNaoEncontrado from "@/components/produto/ProdutoNaoEncontrado";
import Loader from "@/components/template/Loader";
import { useProdutos } from "@/data/hooks/useProdutos";
import { Produto } from "@gstore/core";
export default function PaginaProduto(props: any) {
	const { id }: { id: string } = use(props.params);
	const { pegarProdutoPorId } = useProdutos();

	const [produto, setProduto] = useState<Produto | null>(null);
	useEffect(() => {
		pegarProdutoPorId(+id).then((dados) => setProduto(dados));
	}, []);

	if (!produto) {
		return <Loader />;
	}

	return produto ? (
		<div className="flex flex-col gap-20 container py-10">
			<div className="flex flex-col gap-10">
				<TituloProduto produto={produto} />
				<InformacoesProduto produto={produto} />
				<BannerCompra produto={produto} />
				<MedidorDePreco produto={produto} />
			</div>
			<AvaliacoesUsuarios produto={produto} />
			<AvaliacaoEspecializada produto={produto} />
		</div>
	) : (
		<ProdutoNaoEncontrado botaoVoltar />
	);
}
