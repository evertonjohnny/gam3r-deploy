interface TagProps {
	texto: string;
	icone: React.ElementType;
	outlined?: boolean;
}

export default function Tag(props: TagProps) {
	const { texto, outlined } = props;
	return (
		<div
			className={`
        flex items-center gap-2 self-start py-1 px-4
        rounded-full text-sm uppercase
        ${
					outlined
						? "border border-violet-500 text-white"
						: "bg-gradient-to-r from-violet-600 to-violet-700"
				}
    `}
		>
			<props.icone size={18} />
			<span>{texto}</span>
		</div>
	);
}
