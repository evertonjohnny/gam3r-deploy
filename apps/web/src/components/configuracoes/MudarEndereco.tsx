"use client";
import { cn } from "@/utils/cn";
import { Endereco } from "@gstore/core";
import { useState } from "react";
import Input from "../shared/Input";
import BotoesEdicao from "./BotoesEdicao";
import SelectEstados from "./SelectEstados";
import SelectCidades from "./SelectCidades";

interface EnderecoProps {
	endereco?: Endereco;
	persistirAlteracao: (e: Endereco) => Promise<boolean>;
}

export default function MudarEndereco({
	endereco,
	persistirAlteracao,
}: EnderecoProps) {
	const [logradouro, setLogradouro] = useState(endereco?.logradouro || "");
	const [numero, setNumero] = useState(endereco?.numero || "");
	const [complemento, setComplemento] = useState(endereco?.complemento || "");
	const [cidade, setCidade] = useState(endereco?.cidade || "");
	const [estado, setEstado] = useState(endereco?.estado || "");
	const [bairro, setBairro] = useState(endereco?.bairro || "");
	const [editando, setEditando] = useState(false);

	function resetar() {
		setLogradouro(endereco?.logradouro ?? "");
		setNumero(endereco?.numero ?? "");
		setComplemento(endereco?.complemento ?? "");
		setCidade(endereco?.cidade ?? "");
		setEstado(endereco?.estado ?? "");
		setBairro(endereco?.bairro ?? "");
	}

	return (
		<div className="flex flex-col">
			<h2 className="text-xl my-4 text-zinc-200 font-semibold"> Endereco:</h2>
			<div
				className={cn(
					"mb-3 gap-3 items-stretch",
					"grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr_1fr]"
				)}
			>
				<Input
					desativado={!editando}
					className={editando ? "border-violet-600" : ""}
					texto="Logradouro"
					valor={logradouro}
					setValor={setLogradouro}
				/>

				<Input
					desativado={!editando}
					className={editando ? "border-violet-600" : ""}
					texto="Número"
					valor={numero}
					setValor={setNumero}
				/>

				<Input
					desativado={!editando}
					className={editando ? "border-violet-600" : ""}
					texto="Complemento"
					valor={complemento}
					setValor={setComplemento}
				/>

				<Input
					desativado={!editando}
					className={editando ? "border-violet-600" : ""}
					texto="Bairro"
					valor={bairro}
					setValor={setBairro}
				/>

				<SelectEstados
					valor={estado}
					setValor={setEstado}
					desativado={!editando}
					className={cn("h-11 mt-auto", { "border-violet-600": editando })}
				/>
				<SelectCidades
					valor={cidade}
					estado={estado}
					setValor={setCidade}
					desativado={!editando}
					className={cn("h-11 mt-auto", { "border-violet-600": editando })}
				/>
			</div>
			<BotoesEdicao
				editando={editando}
				setEditando={setEditando}
				resetar={resetar}
				persistirAlteracao={() => {
					return persistirAlteracao({
						logradouro,
						cidade,
						estado,
						bairro,
						complemento,
						numero,
					});
				}}
			/>
		</div>
	);
}
