import Select from "../shared/Select";
import { useState } from "react";
import { useEffect } from "react";

interface SelectEstadosProps {
	desativado: boolean;
	valor: string;
	setValor: (s: string) => void;
	className?: string;
}

export default function SelectEstados(props: SelectEstadosProps) {
	const [estados, setEstados] = useState([]);

	async function pegaEstados() {
		const resultado = await fetch(
			"https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
		);
		const ufs = await resultado.json();
		const siglas = ufs.map((uf: any) => uf.sigla);
		setEstados(siglas);
	}

	useEffect(() => {
		pegaEstados();
	}, []);

	return <Select opcoes={estados} texto="Estados" {...props} />;
}
