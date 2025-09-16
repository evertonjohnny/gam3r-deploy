"use client";
import { useState } from "react";
import Input from "../shared/Input";
import BotoesEdicao from "./BotoesEdicao";
import { cn } from "@/utils/cn";

interface InputDeEdicaoProps {
	texto: string;
	tipo?: "text" | "password" | "email" | "number";
	valorInicial: any;
	persistirAlteracao: (v: any) => Promise<boolean>;
}

export default function InputDeEdicao({
	texto,
	tipo,
	valorInicial,
	persistirAlteracao,
}: InputDeEdicaoProps) {
	const [valor, setValor] = useState(valorInicial);
	const [editando, setEditando] = useState(false);

	function resetCampo() {
		setValor(valorInicial);
	}

	return (
		<div className="flex gap-3">
			<Input
				desativado={!editando}
				texto={texto}
				tipo={tipo}
				valor={valor}
				setValor={setValor}
				className={cn({ "border-violet-600": editando }, "w-full")}
			/>
			<BotoesEdicao
				persistirAlteracao={() => {
					return persistirAlteracao(valor);
				}}
				editando={editando}
				setEditando={setEditando}
				resetar={resetCampo}
			/>
		</div>
	);
}
