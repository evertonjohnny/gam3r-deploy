"use client";
import { InfoCadastro, InfoLogin } from "@gstore/core";
import { createContext, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import CookieSessao from "@/utils/Cookie";

interface Credencial {
	token: string;
	nome: string;
	admin: boolean;
}

interface ContextoAutenticacaoProps {
	credencial: Credencial | null;
	logar: (dados: InfoLogin) => Promise<boolean>;
	cadastrar: (dados: InfoCadastro) => Promise<boolean>;
	atualizarNomeCredencial: (nome: string) => void;
	deslogar: () => void;
	temCredencial: () => boolean;
	carregando: boolean;
}

export const ContextoAutenticacao = createContext<
	ContextoAutenticacaoProps | undefined
>(undefined);

export function ProvedorAutencicacao({ children }: any) {
	const [credencial, setCredencial] = useState<Credencial | null>(null);
	const [carregando, setCarregando] = useState(true);
	const { httpPost } = useAPI();

	useEffect(() => {
		setCarregando(true);
		const cookie: Credencial = CookieSessao.pegar();
		if (cookie) {
			setCredencial(cookie);
		}
		setCarregando(false);
	}, []);

	async function logar(dados: InfoLogin) {
		const resultado: Credencial | undefined = await httpPost("/login", dados);
		if (resultado?.token) {
			CookieSessao.criar(resultado);
			setCredencial(resultado);
			return true;
		}
		return false;
	}

	async function cadastrar(dados: InfoCadastro) {
		const retorno = await httpPost("/cadastro", dados);
		if (retorno) {
			return await logar({ email: dados.email, senha: dados.senha });
		}
		return false;
	}

	function atualizarNomeCredencial(nome: string) {
		const novaCredencial: Credencial | null = CookieSessao.atualizar(nome);
		setCredencial(novaCredencial);
	}

	function deslogar() {
		CookieSessao.limpar();
		setCredencial(null);
	}

	function temCredencial() {
		return !!CookieSessao.pegar();
	}

	return (
		<ContextoAutenticacao.Provider
			value={{
				credencial,
				logar,
				deslogar,
				cadastrar,
				atualizarNomeCredencial,
				temCredencial,
				carregando,
			}}
		>
			{children}
		</ContextoAutenticacao.Provider>
	);
}
