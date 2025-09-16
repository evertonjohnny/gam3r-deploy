import { cn } from "@/utils/cn";
import NavLink from "../template/Navlink";

const itensMenu = [
	{ nome: "Home", url: "/admin", caminhoExato: true },
	{ nome: "Produtos", url: "/admin/produtos" },
	{ nome: "Pedidos", url: "/admin/pedidos" },
];

export default function MenuAdmin() {
	return (
		<nav
			className={cn(
				"bg-violet-dark/50 mx-auto my-10 p-8",
				"flex items-center justify-center flex-wrap gap-3",
				"rounded-md min-h-14 border border-white/20"
			)}
		>
			{itensMenu.map((item) => (
				<NavLink
					url={item.url}
					nome={item.nome}
					key={item.nome}
					caminhoExato={item.caminhoExato}
				/>
			))}
		</nav>
	);
}
