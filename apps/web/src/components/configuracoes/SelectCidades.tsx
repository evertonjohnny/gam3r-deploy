import Select from "../shared/Select";
import { useEffect, useState } from "react";

interface SelectCidadesProps {
	desativado: boolean;
	valor: string;
	setValor: (s: string) => void;
	className?: string;
	estado: string;
}

export default function SelectCidades(props: SelectCidadesProps) {
	const [cidades, setCidades] = useState<string[]>([]);

	async function pegaCidades(uf: string) {
		const resultado = await fetch(
			`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
		);
		const dados = await resultado.json();
		const cidades = dados.map((dado: any) => dado.nome);
		setCidades(cidades);
	}

	useEffect(() => {
		pegaCidades(props.estado);
	}, [props.estado]);

	return <Select opcoes={cidades} texto="Cidades" {...props} />;
}
