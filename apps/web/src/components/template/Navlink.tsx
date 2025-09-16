"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	nome: string;
	url: string;
	caminhoExato?: boolean;
}

export default function NavLink({ nome, url, caminhoExato }: NavLinkProps) {
	const caminho = usePathname();

	const ativo = caminhoExato ? url === caminho : caminho.startsWith(`${url}`);
	return (
		<Link
			href={url}
			className={cn("text-md font-semibold text-gray-300 hover:text-white", {
				"border-sky-500 text-sky-500 border-b": ativo,
				"hover:border-sky-700 hover:text-sky-700 ": ativo,
			})}
		>
			{nome}
		</Link>
	);
}
