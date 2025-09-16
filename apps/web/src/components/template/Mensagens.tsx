"use client";
import { cn } from "@/utils/cn";
import Botao from "../shared/Botao";
import { useMensagens } from "@/data/hooks/useMensagens";

export default function Mensagens() {
	const { mensagens, removerMensagem } = useMensagens();

	return (
		<div className="fixed top-4 right-4 w-60 z-50 m-5">
			<ul className="space-y-2 bg-transparent">
				{mensagens.map((mensagem, i) => {
					return (
						<li
							key={i}
							className={cn(
								"text-gray-200 font-medium",
								"flex justify-between items-center",
								"p-4 rounded-lg",
								{
									"bg-pink-500": mensagem.tipo === "erro",
									"bg-emerald-500": mensagem.tipo === "sucesso",
								}
							)}
						>
							{mensagem.texto}

							<Botao
								onClick={() => {
									removerMensagem(i);
								}}
								className={cn(
									"ml-4 py-1 px-2 rounded",
									"text-white font-bold border-none",
									{
										"bg-pink-600 hover:bg-pink-800": mensagem.tipo === "erro",
										"bg-emerald-600 hover:bg-emerald-800":
											mensagem.tipo === "sucesso",
									}
								)}
							>
								X
							</Botao>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
