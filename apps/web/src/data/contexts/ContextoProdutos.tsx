"use client";
import { Produto } from "@gstore/core";
import { createContext, useCallback, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
interface ContextoProdutosProps {
	produtos: Produto[] | null;
	carregarPagina: (pagina: number) => Promise<void>;
	qtdePaginas: number;
	pesquisa: string;
	setPesquisa: (texto: string) => void;
	buscaProdutos: () => void;
	salvarProduto: (produto: Produto) => Promise<boolean>;
	pegarProdutoPorId: (id: number) => Promise<Produto>;
	paginaAtual: number;
	setPaginaAtual: (n: number) => void;
	deletarProdutoPorId: (id: number) => Promise<void>;
}

export const ContextoProdutos = createContext<
	ContextoProdutosProps | undefined
>(undefined);

export function ProvedorProdutos({ children }: any) {
	const [produtos, setProdutos] = useState<Produto[] | null>(null);
	const [qtdePaginas, setQtdePaginas] = useState(1);
	const [pesquisa, setPesquisa] = useState("");
	const [paginaAtual, setPaginaAtual] = useState(1);

	const { httpGet, httpPost, httpPatch, httpDelete } = useAPI();

	useEffect(() => {
		buscaProdutos();
	}, []);

	const carregarPagina = useCallback(
		async (pagina: number, pesquisa?: string) => {
			const produtos = await httpGet(
				`/produtos?p=${pagina}${pesquisa ? `&pesquisa=${pesquisa}` : ""}`
			);
			setProdutos(produtos ?? []);
		},
		[]
	);

	function buscaProdutos() {
		carregarPagina(1, pesquisa);
		carregarQtdePaginas(pesquisa);
	}

	const carregarQtdePaginas = useCallback(async (pesquisa?: string) => {
		const qtdePaginas = await httpGet(
			`/produtos/qtdePaginas${pesquisa ? `?pesquisa=${pesquisa}` : ""}`
		);
		setQtdePaginas(qtdePaginas);
	}, []);

	async function salvarProduto(produto: Produto) {
		if (!produto.id || produto.id === -1) {
			return await httpPost("/produtos", produto);
		} else {
			return await httpPatch(`/produtos/${produto.id}`, produto);
		}
	}

	const deletarProdutoPorId = useCallback(async (id: number) => {
		const sucesso = await httpDelete(`/produtos/${id}`);
		if (sucesso) {
			carregarPagina(paginaAtual, pesquisa);
		}
	}, []);

	const pegarProdutoPorId = useCallback(async (id: number) => {
		const dados = await httpGet(`/produtos/${id}`);
		return dados;
	}, []);

	return (
		<ContextoProdutos.Provider
			value={{
				produtos,
				carregarPagina,
				qtdePaginas,
				pesquisa,
				setPesquisa,
				buscaProdutos,
				salvarProduto,
				pegarProdutoPorId,
				paginaAtual,
				setPaginaAtual,
				deletarProdutoPorId,
			}}
		>
			{children}
		</ContextoProdutos.Provider>
	);
}
