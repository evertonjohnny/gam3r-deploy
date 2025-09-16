import { cn } from "@/utils/cn";
import Input, { InputProps } from "../shared/Input";

interface SessaoFormularioProps {
	icone: any;
	titulo: string;
	propsInputs?: InputProps[];
	children?: any;
	unicaColuna?: boolean;
}

export default function SessaoFormulario(props: SessaoFormularioProps) {
	const { titulo, propsInputs, children, unicaColuna } = props;
	return (
		<div className="mb-10">
			<h3 className="text-lg font-semibold text-violet-200 mb-4 flex items-center">
				<props.icone size={20} className="mr-2" />
				{titulo}
			</h3>
			<div
				className={cn("grid grid-cols-1 gap-4", {
					"md:grid-cols-2": !unicaColuna,
				})}
			>
				{propsInputs &&
					propsInputs.map((props) => <Input {...props} key={props.texto} />)}
				{children && children}
			</div>
		</div>
	);
}
