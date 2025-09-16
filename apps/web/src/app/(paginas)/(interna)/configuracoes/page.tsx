"use client";
import { IconSettings } from "@tabler/icons-react";
import InputDeEdicao from "@/components/configuracoes/InputDeEdicao";
import MudarEndereco from "@/components/configuracoes/MudarEndereco";
import Select from "@/components/shared/Select";
import MudarSenha from "@/components/configuracoes/MudarSenha";
import { useEffect, useState } from "react";
import useAPI from "@/data/hooks/useAPI";
import { Usuario } from "@gstore/core";
import { useAutenticacao } from "@/data/hooks/useAutenticacao";
import { useRouter } from "next/navigation";
import Loader from "@/components/template/Loader";
export default function Configuracoes() {
	const [usuario, setUsuario] = useState<Usuario | null>(null);
	const { httpGet, httpPatch } = useAPI();
	const { deslogar, atualizarNomeCredencial } = useAutenticacao();
	const router = useRouter();

	async function pegarUsuario() {
		const dados = await httpGet("/usuario");
		if (dados) {
			setUsuario(dados);
		}
	}

	useEffect(() => {
		pegarUsuario();
	}, []);

	if (!usuario) {
		return <Loader />;
	}

	async function salvarCampo(campo: string, valor: any) {
		const resultado = await httpPatch("/usuario", { [campo]: valor });
		return !!resultado;
	}

	return (
		<div className="container py-10">
			<h1 className="text-2xl font-bold mb-5 flex items-center gap-1">
				<IconSettings />
				Meus Dados
			</h1>
			<div className="flex flex-col gap-3 bg-violet-dark/50 rounded-xl p-6">
				<InputDeEdicao
					texto="Nome"
					valorInicial={usuario.nome}
					persistirAlteracao={async (novoNome) => {
						const sucesso = await salvarCampo("nome", novoNome);
						if (sucesso) {
							atualizarNomeCredencial(novoNome);
						}
						return sucesso;
					}}
				/>
				<InputDeEdicao
					texto="Email"
					valorInicial={usuario.email}
					persistirAlteracao={async (novoEmail) => {
						const sucesso = await salvarCampo("email", novoEmail);
						if (sucesso) {
							deslogar();
							router.push("/");
						}
						return sucesso;
					}}
				/>
				<InputDeEdicao
					texto="CPF"
					valorInicial={usuario.cpf ?? ""}
					persistirAlteracao={(novoCPF) => {
						return salvarCampo("cpf", novoCPF);
					}}
				/>
				<MudarEndereco
					endereco={usuario.endereco}
					persistirAlteracao={(novoEndereco) => {
						return salvarCampo("endereco", novoEndereco);
					}}
				/>
				<MudarSenha />
			</div>
		</div>
	);
}
