import { cn } from "@/utils/cn";
interface SelectProps {
	texto: string;
	opcoes: string[];
	valor: string;
	setValor: (s: string) => void;
	desativado?: boolean;
	className?: string;
}

export default function Select({
	desativado,
	className,
	texto,
	opcoes,
	setValor,
	valor,
}: SelectProps) {
	return (
		<select
			className={cn("input", { "text-gray-400/50": desativado }, className)}
			onChange={(e) => {
				setValor(e.target.value);
			}}
			disabled={desativado}
			value={valor}
		>
			<option
				disabled
				value=""
				className="bg-violet-dark text-zinc-200 hover:bg-violet-800"
			>
				{texto}
			</option>
			{opcoes.length &&
				opcoes.map((opcao, i) => (
					<option
						className="bg-violet-dark text-zinc-200 hover:bg-violet-800"
						key={i}
						value={opcao}
					>
						{opcao}
					</option>
				))}
		</select>
	);
}
