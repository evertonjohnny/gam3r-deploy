"use client";
import { useEffect, useState } from "react";
import useAPI from "@/data/hooks/useAPI";
import { DadosEntrega as DadosEntregaModel } from "@gstore/core";
import Input from "../shared/Input";
import Botao from "../shared/Botao";
import Link from "next/link";
import { IconPencil } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import Loader from "../template/Loader";

export default function DadosEntrega() {
	const [dados, setDados] = useState<DadosEntregaModel | null>(null);
	const { httpGet } = useAPI();
	useEffect(() => {
		httpGet("/usuario").then((dados) =>
			setDados({
				nome: dados.nome,
				email: dados.email,
				cpf: dados.cpf,
				...dados.endereco,
			})
		);
	}, [httpGet]);

	if (!dados) {
		return <Loader />;
	}

	return (
		<div className="flex flex-col gap-3">
			<span className="px-7 pb-2 text-xl font-bold text-white/70">
				Dados de Entrega
			</span>
			<div className="flex flex-col gap-5 bg-violet-dark/50 rounded-xl p-6">
				<Input
					texto="Nome Completo"
					valor={dados.nome}
					desativado={true}
					setValor={() => {}}
				/>
				<div className="flex flex-col md:flex-row gap-5">
					<Input
						texto="E-mail"
						valor={dados.email}
						desativado={true}
						setValor={() => {}}
					/>
					<Input
						texto="CPF"
						valor={dados.cpf}
						desativado={true}
						setValor={() => {}}
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-5">
					<Input
						texto="Logradouro"
						valor={dados.logradouro}
						desativado={true}
						setValor={() => {}}
					/>
					<Input
						texto="Complemento"
						valor={dados.complemento}
						desativado={true}
						setValor={() => {}}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-5">
					<Input
						texto="Cidade"
						valor={dados.cidade}
						desativado={true}
						setValor={() => {}}
					/>
					<Input
						texto="Estado"
						valor={dados.estado}
						desativado={true}
						setValor={() => {}}
					/>
				</div>

				<Link
					className={cn(
						"botao flex items-center gap-2 p-2 font-medium",
						"bg-violet-600 border-2 border-violet-600 hover:border-emerald-500"
					)}
					href="/configuracoes"
				>
					<IconPencil /> Alterar Dados
				</Link>
			</div>
		</div>
	);
}
