"use client";
import Botao from "@/components/shared/Botao";
import Input from "@/components/shared/Input";
import { cn } from "@/utils/cn";
import { IconLogin2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useAutenticacao } from "@/data/hooks/useAutenticacao";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const { logar } = useAutenticacao();
	const router = useRouter();

	return (
		<div className="container py-10 lg:w-1/2">
			<div className="mb-5">
				<h2 className="text-2xl mb-2 font-bold flex items-center gap-1">
					<IconLogin2 />
					Login
				</h2>
				<div className="cursor-default">
					<span>Não tem uma conta? Faça seu cadastro</span>
					<Link
						href="/cadastro"
						className="text-emerald-500 ml-1 cursor-pointer hover:underline"
					>
						aqui
					</Link>
				</div>
			</div>
			<div className="flex flex-col bg-violet-dark/50 rounded-xl py-10 px-5 md:px-10">
				<div className="flex flex-col gap-5">
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
						const sucesso = await logar({ email, senha });
						if (sucesso) {
							router.push("/");
						}
					}}
					className={cn(
						"mt-5 p-4 py-5 text-xl hover:font-semibold",
						"self-end w-28 hover:bg-emerald-600"
					)}
				>
					<span className="text-lg ">Entrar</span>
				</Botao>
			</div>
		</div>
	);
}
