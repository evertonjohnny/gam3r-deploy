"use client";
import Botao from "@/components/shared/Botao";
import Input from "@/components/shared/Input";
import { useAutenticacao } from "@/data/hooks/useAutenticacao";
import { cn } from "@/utils/cn";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const { cadastrar } = useAutenticacao();
	const router = useRouter();

	return (
		<div className="container py-10 lg:w-1/2">
			<div className="mb-5 ">
				<h2 className="text-2xl mb-2 font-bold flex items-center gap-1">
					<IconUserPlus />
					Cadastro
				</h2>
				<div className="cursor-default">
					<span>Já tem uma conta? Entre</span>
					<Link
						href="/login"
						className="text-emerald-500 ml-1 cursor-pointer hover:underline"
					>
						aqui
					</Link>
				</div>
			</div>
			<div className="flex flex-col bg-violet-dark/50 rounded-xl py-10 px-5 md:px-10">
				<div className="flex flex-col gap-5">
					<Input texto="Nome" valor={nome} setValor={setNome} />
					<Input texto="Email" valor={email} setValor={setEmail} />
					<Input
						texto="Senha"
						tipo="password"
						valor={senha}
						setValor={setSenha}
					/>
				</div>
				<Botao
					onClick={async () => {
						const sucesso = await cadastrar({ nome, email, senha });
						if (sucesso) {
							router.push("/");
						}
					}}
					className={cn(
						"mt-5 p-4 py-5 text-xl hover:font-semibold",
						"self-end w-28 hover:bg-emerald-600"
					)}
				>
					<span className="text-lg ">Cadastrar</span>
				</Botao>
			</div>
		</div>
	);
}
