"use client";
import Input from "../shared/Input";
import { useState } from "react";
import BotoesEdicao from "./BotoesEdicao";
import useAPI from "@/data/hooks/useAPI";
export default function MudarSenha() {
	const [senhaAtual, setSenhaAtual] = useState("");
	const [novaSenha, setNovaSenha] = useState("");
	const [editando, setEditando] = useState(false);
	const { httpPatch } = useAPI();

	async function salvarSenha() {
		const sucesso = await httpPatch("/usuario/senha", {
			senhaAtual,
			novaSenha,
		});
		if (sucesso) {
			resetar();
		}
		return sucesso;
	}

	function resetar() {
		setSenhaAtual("");
		setNovaSenha("");
	}

	return (
		<div className="flex flex-col">
			<h2 className="text-xl mb-4 text-zinc-200 font-semibold">Senha:</h2>
			<div className="flex flex-col md:flex-row gap-3">
				<Input
					texto="Senha Atual:"
					valor={senhaAtual}
					setValor={setSenhaAtual}
					desativado={!editando}
					className={editando ? "border-violet-600" : ""}
				/>
				<Input
					texto="Nova Senha:"
					valor={novaSenha}
					setValor={setNovaSenha}
					desativado={!editando}
					className={editando ? "border-violet-600" : ""}
				/>
				<BotoesEdicao
					editando={editando}
					setEditando={setEditando}
					persistirAlteracao={salvarSenha}
					resetar={resetar}
				/>
			</div>
		</div>
	);
}
