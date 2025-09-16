import Link from "next/link";
import IconeUsuario from "./IconeUsuario";

export default function EntreOuCadastre() {
	return (
		<div className="flex gap-3 items-center m-0 md:m-3 text-xs md:text-sm">
			<IconeUsuario />
			<div className="flex flex-col">
				<div>
					<Link
						href="/login"
						className="text-sky-500 font-bold hover:underline"
					>
						Entre
					</Link>
					<span> ou</span>
				</div>
				<Link
					href="/cadastro"
					className="font-bold text-emerald-500 hover:underline"
				>
					Cadastre-se
				</Link>
			</div>
		</div>
	);
}
