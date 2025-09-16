"use client";
import Logo from "../shared/Logo";
import EntreOuCadastre from "./EntreOuCadastre";
import { useAutenticacao } from "@/data/hooks/useAutenticacao";
import MenuUsuario from "./MenuUsuario";
import IconeCarrinho from "./IconeCarrinho";
import { IconLoader3 } from "@tabler/icons-react";
export default function Cabecalho() {
	const { credencial, carregando } = useAutenticacao();
	return (
		<div
			className="flex flex-col h-20"
			style={{
				background:
					"linear-gradient(90deg, #14002d 0%, #420093 50%, #14002D 100%",
			}}
		>
			<div className="flex-1 container flex flex-col justify-center">
				<div className="flex justify-between items-center">
					<Logo />
					{carregando ? (
						<IconLoader3 className="animate-spin" />
					) : (
						<div className="flex items-center gap-4">
							{credencial?.token ? <MenuUsuario /> : <EntreOuCadastre />}
							<IconeCarrinho />
						</div>
					)}
				</div>
			</div>
			<div
				className={`
            h-px bg-gradient-to-r from-violet-600/20 via-violet-600/80 to-violet-600/20
            `}
			></div>
		</div>
	);
}
