interface TituloPaginaProps {
	texto: string;
	icone: any;
}

export default function TituloPagina(props: TituloPaginaProps) {
	return (
		<h2 className="text-3xl mb-2 font-semibold flex w-full justify-center items-center gap-2">
			<props.icone size={50} stroke={1.3} />
			{props.texto}
		</h2>
	);
}
