import { IconDevicesPcOff } from "@tabler/icons-react";
import Link from "next/link";

interface ProdutoNaoEncontradoProps {
	botaoVoltar?: boolean;
}

export default function ProdutoNaoEncontrado({
	botaoVoltar,
}: ProdutoNaoEncontradoProps) {
	return (
		<div className="flex-1 flex flex-col justify-center items-center text-violet-300">
			<IconDevicesPcOff size={300} stroke={0.3} />
			<span className="text-violet-300 font-light text-xl">
				Produto não encontrado
			</span>
			{botaoVoltar && (
				<Link href="/" className="botao bg-violet-700 text-white mt-5">
					Voltar
				</Link>
			)}
		</div>
	);
}
