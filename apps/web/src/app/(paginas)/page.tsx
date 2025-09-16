"use client";
import ListaProdutos from "@/components/produto/ListaProdutos";
import PesquisaProduto from "@/components/produto/PesquisaProduto";
import Loader from "@/components/template/Loader";
import Paginacao from "@/components/template/Paginacao";
import { useProdutos } from "@/data/hooks/useProdutos";
export default function Home() {
	const { produtos } = useProdutos();
	if (!produtos) {
		return <Loader />;
	}
	return (
		<div className="flex-1 flex flex-col container gap-5 py-10">
			<PesquisaProduto />
			<ListaProdutos />
			<Paginacao />
		</div>
	);
}
