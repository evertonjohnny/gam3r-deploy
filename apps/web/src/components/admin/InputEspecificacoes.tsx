import { IconPlus, IconX } from "@tabler/icons-react";
import Botao from "../shared/Botao";
import { useState } from "react";
import Input from "../shared/Input";

interface InputEspecificacoesProps {
	especificacoes: any;
	setEspecificacoes: (especificacoes: any) => void;
}

export default function InputEspecificacoes({
	especificacoes,
	setEspecificacoes,
}: InputEspecificacoesProps) {
	const inputsIniciais = especificacoes
		? Object.entries(especificacoes).map(([chave, valor]) => ({ chave, valor }))
		: [{ chave: "", valor: "" }];
	const [inputs, setInput] = useState(inputsIniciais);

	function deletarEspecificacao(indice: number) {
		const novosInputs = inputs.filter((_, i) => {
			return i !== indice;
		});
		setInput(novosInputs);

		const novasEspecificacoes = inputsToEspecificaoes(novosInputs);
		setEspecificacoes(novasEspecificacoes);
	}

	function inputsToEspecificaoes(inputs: any[]) {
		const entradas = inputs.map((item) => [item.chave, item.valor]);
		return Object.fromEntries(entradas);
	}

	function alteraInput(
		indice: number,
		tipo: "chave" | "valor",
		valorAtualizado: string
	) {
		const inputsCopia = [...inputs];
		if (tipo === "chave") {
			inputsCopia[indice].chave = valorAtualizado;
		} else {
			inputsCopia[indice].valor = valorAtualizado;
		}
		setInput(inputsCopia);

		const novasEspecificacoes = inputsToEspecificaoes(inputsCopia);
		setEspecificacoes(novasEspecificacoes);
	}

	return (
		<div className="flex flex-col">
			<Botao
				onClick={() => {
					setInput([...inputs, { chave: "", valor: "" }]);
				}}
				className="px-8 self-start mt-2 mb-6"
			>
				<IconPlus /> Adicionar
			</Botao>
			{inputs.map((input, indice) => {
				return (
					<div key={indice} className="flex flex-col md:flex-row gap-3 my-2">
						<Input
							texto="Chave"
							valor={input.chave}
							setValor={(valor: any) => {
								alteraInput(indice, "chave", valor);
							}}
						/>
						<Input
							texto="Valor"
							valor={input.valor}
							setValor={(valor: any) => {
								alteraInput(indice, "valor", valor);
							}}
						/>
						<Botao
							onClick={() => deletarEspecificacao(indice)}
							className="my-2 bg-pink-600 border-2 border-pink-600 hover:bg-pink-700 hover:border-emerald-500 self-end"
						>
							<IconX /> Deletar
						</Botao>
					</div>
				);
			})}
		</div>
	);
}
