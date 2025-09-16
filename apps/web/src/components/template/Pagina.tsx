import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
interface PaginaProps {
	children: any;
	className?: string;
}

export default function Pagina({ children, className }: PaginaProps) {
	return (
		<div
			className="flex flex-col min-h-screen"
			style={{
				background:
					"radial-gradient(50% 50% at 50% 50%, #2d0064 0%, #0d001c 100% )",
			}}
		>
			<div
				className="flex-1 flex flex-col w-full"
				style={{ background: 'url("/background.png")' }}
			>
				<Cabecalho />
				<main className={`flex-1 flex flex-col ${className ?? ""}`}>
					{children}
				</main>
				<Rodape />
			</div>
		</div>
	);
}
