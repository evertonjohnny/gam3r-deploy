"use client";
import { useEffect, useState } from "react";
import ProdutoItem from "@/components/produto/ProdutoItem";
import { Produto } from "@gstore/core";
import ProdutoNaoEncontrado from "./ProdutoNaoEncontrado";
import useAPI from "@/data/hooks/useAPI";
import { useProdutos } from "@/data/hooks/useProdutos";

export default function ListaProdutos() {
	const { produtos } = useProdutos();
	if (!produtos || produtos?.length === 0) {
		return <ProdutoNaoEncontrado />;
	}

	return (
		<div
			className={`
            grid gap-5 mx-auto justify-items-center
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        `}
		>
			{produtos.map((produto: Produto) => {
				return <ProdutoItem produto={produto} key={produto.id} />;
			})}
		</div>
	);
}
