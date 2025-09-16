"use client";
import {
	CalcularParcelamento,
	Carrinho,
	ItemCarrinho,
	Parcelamento,
	Produto,
} from "@gstore/core";
import { createContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FormaPagamento, PedidoInput } from "@gstore/core";
import useAPI from "../hooks/useAPI";
import { useAutenticacao } from "../hooks/useAutenticacao";

interface ContextoCarrinhoProps {
	itens: ItemCarrinho[];
	qtdeDeItens: number;
	valorTotal: number;
	valorTotalCheio: number;
	formaPagamento: FormaPagamento;
	parcelamento: Parcelamento;
	adicionarItem: (produto: Produto) => void;
	removerItem: (produto: Produto) => void;
	removerProduto: (produto: Produto) => void;
	alterarFormaPagamento: (formaPagamento: FormaPagamento) => void;
	finalizarCompra: () => Promise<boolean>;
	limparCarrinho: () => void;
}

export const ContextoCarrinho = createContext<
	ContextoCarrinhoProps | undefined
>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProvedorCarrinho({ children }: any) {
	const [carrinho, setCarrinho] = useState<Carrinho>(new Carrinho());
	const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>(
		FormaPagamento.PIX
	);
	const {
		salvarItem,
		obterItem,
		removerItem: removerItemLS,
	} = useLocalStorage();
	const { httpPost } = useAPI();
	const { credencial } = useAutenticacao();

	const nomeUsuarioFormatado = credencial?.nome
		?.replace(" ", "")
		.toLocaleLowerCase();

	const NOME_CARRINHO = nomeUsuarioFormatado
		? `carrinho-${nomeUsuarioFormatado}`
		: "carrinho";

	useEffect(() => {
		if (carrinho.itens.length) {
			alterarCarrinho(carrinho);
			removerItemLS("carrinho");
		} else {
			const itensSalvos = obterItem(NOME_CARRINHO);
			if (itensSalvos) setCarrinho(new Carrinho(itensSalvos));
		}

		const formaPagamentoSalva = obterItem("forma-pagamento");
		if (formaPagamentoSalva) setFormaPagamento(formaPagamentoSalva);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [credencial]);

	function alterarCarrinho(novoCarrinho: Carrinho) {
		salvarItem(NOME_CARRINHO, novoCarrinho.itens);
		setCarrinho(novoCarrinho);
	}

	function adicionarItem(produto: Produto) {
		alterarCarrinho(carrinho.adicionarItem(produto));
	}

	function removerItem(produto: Produto) {
		alterarCarrinho(carrinho.removerItem(produto));
	}

	function removerProduto(produto: Produto) {
		alterarCarrinho(carrinho.removerProduto(produto));
	}

	function alterarFormaPagamento(formaPagamento: FormaPagamento) {
		salvarItem("forma-pagamento", formaPagamento);
		setFormaPagamento(formaPagamento);
	}

	function limparCarrinho() {
		setCarrinho(new Carrinho());
	}

	async function finalizarCompra() {
		const pedido: PedidoInput = {
			formaPagamento,
			itens: carrinho.itens.map((item) => ({
				produtoId: item.produto.id,
				quantidade: item.quantidade,
				nome: item.produto.nome,
			})),
		};

		const resposta = await httpPost("/pedidos", pedido);

		if (resposta) {
			alterarCarrinho(carrinho.limpar());
		}

		return !!resposta;
	}

	return (
		<ContextoCarrinho.Provider
			value={{
				itens: carrinho.itens,
				qtdeDeItens: carrinho.qtdeDeItens,
				valorTotal: carrinho.valorTotal,
				valorTotalCheio: carrinho.valorTotalCheio,
				parcelamento: new CalcularParcelamento().executar(carrinho.valorTotal),
				adicionarItem,
				removerItem,
				removerProduto,
				formaPagamento,
				alterarFormaPagamento,
				finalizarCompra,
				limparCarrinho,
			}}
		>
			{children}
		</ContextoCarrinho.Provider>
	);
}
