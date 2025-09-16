import { cn } from "@/utils/cn";
import IconeUsuario from "./IconeUsuario";
import { useAutenticacao } from "@/data/hooks/useAutenticacao";
import {
	IconLock,
	IconSettings,
	IconShoppingBag,
	IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCarrinho } from "@/data/hooks/useCarrinho";

export default function MenuUsuario() {
	const { credencial, deslogar } = useAutenticacao();

	const itensMenu = [
		{ nome: "Meus Dados", url: "/configuracoes", icone: IconSettings },
		{ nome: "Meus Pedidos", url: "/pedidos", icone: IconShoppingBag },
		{ nome: "Carrinho", url: "/carrinho", icone: IconShoppingCart },
	];

	if (credencial?.admin) {
		itensMenu.push({
			nome: "Administração",
			url: "/admin",
			icone: IconLock,
		});
	}

	const { limparCarrinho } = useCarrinho();
	const router = useRouter();
	return (
		<div className="group relative md:mx-3">
			<div className="flex items-center gap-2 text-sm md:text-md flex-wrap justify-end">
				<IconeUsuario />
				<span>Olá,</span>
				<span className="text-emerald-500">
					{credencial?.nome ?? "Jane Doe"}
				</span>
			</div>
			<div className="absolute right-0 w-48 z-50 hidden group-hover:block">
				<ul
					className={cn(
						"m-2 rounded-md py-1",
						"shadow-lg text-zinc-200 text-sm",
						"bg-gradient-to-bl from-violet-900 to-violet-950"
					)}
				>
					<li className="font-semibold text-lg px-4 py-2 text-center">
						Perfil
					</li>
					<div className="h-[0.5px] w-full bg-zinc-100/10"></div>
					<div className="py-2">
						{itensMenu.map((item) => {
							return (
								<li key={item.nome}>
									<Link
										href={item.url}
										className="hover:font-semibold px-4 py-1 flex gap-2 items-center"
									>
										{item.icone && <item.icone size={20} />}
										{item.nome}
									</Link>
								</li>
							);
						})}
					</div>
					<div className="h-[0.5px] w-full bg-zinc-100/10"></div>
					<li
						onClick={() => {
							deslogar();
							limparCarrinho();
							router.push("/");
						}}
						className="hover:font-semibold py-2 px-4 cursor-pointer hover:text-pink-500"
					>
						Sair
					</li>
				</ul>
			</div>
		</div>
	);
}
