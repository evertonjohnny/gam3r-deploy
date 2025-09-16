"use client";
import { createContext, useState } from "react";

interface Mensagem {
	texto: string;
	tipo: "sucesso" | "erro";
}

interface ContextoMensagensProps {
	mensagens: Mensagem[];
	adicionarMensagemSucesso: (texto: string) => void;
	adicionarMensagemErro: (texto: string) => void;
	removerMensagem: (indice: number) => void;
}

export const ContextoMensagens = createContext<
	ContextoMensagensProps | undefined
>(undefined);

export function ProvedorMensagens({ children }: any) {
	const [mensagens, setMensagens] = useState<Mensagem[]>([]);

	function adicionarMensagemSucesso(texto: string) {
		setMensagens((mensagensAnteriores) => {
			return [...mensagensAnteriores, { texto, tipo: "sucesso" }];
		});
	}

	function adicionarMensagemErro(texto: string) {
		setMensagens((mensagensAnteriores) => {
			return [...mensagensAnteriores, { texto, tipo: "erro" }];
		});
	}

	function removerMensagem(indice: number) {
		setMensagens((mensagensAnteriores) => {
			return [
				...mensagensAnteriores.slice(0, indice),
				...mensagensAnteriores.slice(indice + 1),
			];
		});
	}

	return (
		<ContextoMensagens.Provider
			value={{
				mensagens,
				removerMensagem,
				adicionarMensagemErro,
				adicionarMensagemSucesso,
			}}
		>
			{children}
		</ContextoMensagens.Provider>
	);
}
