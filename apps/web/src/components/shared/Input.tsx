import { cn } from "@/utils/cn";

export interface InputProps {
	texto: string;
	tipo?: "text" | "password" | "email" | "number";
	valor: any;
	setValor: any;
	desativado?: boolean;
	className?: string;
}

export default function Input(props: InputProps) {
	return (
		<div className="flex flex-col w-full">
			<label className="text-md font-bold mb-1">{props.texto}</label>
			<input
				className={cn(
					"input",
					{ "text-gray-400/50": props.desativado },
					props.className
				)}
				value={props.valor ?? ""}
				type={props.tipo ?? "text"}
				onChange={(e) => props.setValor(e.target.value)}
				disabled={props.desativado}
			/>
		</div>
	);
}
