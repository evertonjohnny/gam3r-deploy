import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default function Sucesso() {
	return (
		<div className="flex flex-col gap-7 container">
			<div className="flex flex-col justify-center items-center gap-5 py-20">
				<Image src="/logo.png" alt="Sucesso" width={300} height={300} />

				<div className="flex flex-col items-center text-center">
					<h2
						className={cn(
							"text-3xl font-bold",
							"bg-gradient-to-r from-white to-emerald-500",
							"bg-clip-text text-transparent"
						)}
					>
						Pedido Realizado com Sucesso!
					</h2>
					<p className="text-zinc-500">
						Você pode acompanhar sua compra clicando em
						<Link href="/pedidos" className="font-bold mx-1 hover:underline">
							Meus Pedidos
						</Link>
						no menu de usuário
					</p>
				</div>
			</div>
		</div>
	);
}
