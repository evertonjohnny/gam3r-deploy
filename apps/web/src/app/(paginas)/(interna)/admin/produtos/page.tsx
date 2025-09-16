"use client";
import { IconBox, IconPlus, IconSearch } from "@tabler/icons-react";
import TituloPagina from "@/components/admin/TituloPagina";
import { useProdutos } from "@/data/hooks/useProdutos";
import CardProdutoAdmin from "@/components/admin/CardProdutoAdmin";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Botao from "@/components/shared/Botao";
import { useState, useEffect } from "react";
import PesquisaProduto from "@/components/produto/PesquisaProduto";
import Paginacao from "@/components/template/Paginacao";
import Loader from "@/components/template/Loader";

export default function ProdutosAdmin() {
	const [mostrarPesquisa, setMostrarPesquisa] = useState(false);
	const { produtos, buscaProdutos, setPesquisa } = useProdutos();

	useEffect(() => {
		setPesquisa("");
		buscaProdutos();
	}, []);

	if (!produtos) {
		return <Loader />;
	}
	return (
		<div className="">
			<TituloPagina texto="Produtos" icone={IconBox} />
			<div className="flex mb-5 justify-center flex-wrap gap-3 my-5 lg:mt-2 lg:justify-end">
				<Link
					href="/admin/produtos/novo"
					className={cn(
						"botao w-52 px-3 text-md self-end",
						"bg-violet-700 hover:bg-violet-800",
						"border-2 border-violet-700 hover:border-emerald-500"
					)}
				>
					<IconPlus size={22} /> Adicionar Produto
				</Link>
				<Botao
					className="botao mx-3 px-6 py-4 border-2 border-violet-700 w-52"
					onClick={() => {
						setMostrarPesquisa(!mostrarPesquisa);
					}}
				>
					<IconSearch size={22} /> Pesquisar
				</Botao>
			</div>
			{mostrarPesquisa && <PesquisaProduto />}
			<div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{produtos &&
					produtos.map((p) => <CardProdutoAdmin key={p.id} produto={p} />)}
			</div>
			<Paginacao />
		</div>
	);
}
