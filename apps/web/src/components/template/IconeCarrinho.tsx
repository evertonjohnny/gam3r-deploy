import { cn } from "@/utils/cn";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { useCarrinho } from "@/data/hooks/useCarrinho";

export default function IconeCarrinho() {
	const { qtdeDeItens } = useCarrinho();
	return (
		<Link href="/carrinho">
			<div
				className={cn(
					"flex justify-center items-center",
					"rounded-full w-12 h-12 p-1 relative",
					"bg-violet-dark"
				)}
			>
				<IconShoppingCart size={34} stroke={1.3} />
				<div
					className={cn(
						"absolute top-2 right-2",
						"bg-pink-500 text-white text-sm font-semibold",
						"rounded-full w-4 h-4 flex items-center justify-center"
					)}
				>
					{qtdeDeItens}
				</div>
			</div>
		</Link>
	);
}
