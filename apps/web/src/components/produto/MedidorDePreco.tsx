import { Produto } from "@gstore/core";
import {
	IconChevronDown,
	IconMoodConfuzed,
	IconMoodHappy,
	IconMoodSad,
} from "@tabler/icons-react";

interface MedidorDePrecoProps {
	produto: Produto;
}

export default function MedidorDePreco({ produto }: MedidorDePrecoProps) {
	const {
		menorPreco: minimo,
		maiorPreco: maximo,
		precoPromocional: atual,
		precoMedio: medio,
	} = produto;

	let percentual;
	if (atual > medio) {
		percentual = ((atual - medio) / (maximo - medio)) * 50 + 50;
	} else {
		percentual = (1 - (medio - atual) / (medio - minimo)) * 50;
	}

	const media = percentual >= 40 && percentual < 60;
	const alto = percentual >= 60;
	const baixo = percentual < 40;
	const corTexto = media
		? "text-yellow-500"
		: alto
			? "text-red-500"
			: "text-green-500";

	const texto = media
		? "na média"
		: alto
			? "acima da média"
			: "abaixo da média";
	return (
		<div className="flex flex-col border border-white/10 p-7 rounded-xl gap-4 bg-violet-dark">
			<div className="flex items-center gap-2">
				{alto && (
					<IconMoodSad size={40} stroke={1.5} className={`${corTexto}`} />
				)}
				{media && (
					<IconMoodConfuzed size={40} stroke={1.5} className={`${corTexto}`} />
				)}
				{baixo && (
					<IconMoodHappy size={40} stroke={1.5} className={`${corTexto}`} />
				)}
				<div className="flex flex-col">
					<div className="flex gap-1.5">
						<span>O preço do produto está</span>
						<span className={`${corTexto} font-bold`}>{texto}</span>
					</div>
					<div className="text-zinc-400 text-sm">
						Com base no preço dos últimos
						<span className="text-white ml-1">30 dias</span>
					</div>
				</div>
			</div>
			<div
				className={`
                flex items-center h-2 rounded-full relativa border-2 border-black
                bg-gradient-to-r from-green-500 via-yellow-500 to-red-500
                `}
			>
				<div
					className="absolute flex justify-center items-center h-4 w-4 bg-white rounded-full"
					style={{
						left: `${percentual}%`,
					}}
				>
					<IconChevronDown size={20} className="absolute text-white -mt-8" />
					<div className="h-2.5 w-2.5 bg-black rounded-full"></div>
				</div>
			</div>
		</div>
	);
}
