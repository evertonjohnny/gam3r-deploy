import Pagina from "@/components/template/Pagina";
import Mensagens from "@/components/template/Mensagens";
import { ProvedorMensagens } from "@/data/contexts/ContextoMensagens";
import { ProvedorAutencicacao } from "@/data/contexts/ContextoAutenticacao";
import { ProvedorCarrinho } from "@/data/contexts/ContextoCarrinho";
import { ProvedorProdutos } from "@/data/contexts/ContextoProdutos";

export default function Layout({ children }: any) {
	return (
		<ProvedorMensagens>
			<ProvedorProdutos>
				<ProvedorAutencicacao>
					<ProvedorCarrinho>
						<Mensagens />
						<Pagina>{children}</Pagina>
					</ProvedorCarrinho>
				</ProvedorAutencicacao>
			</ProvedorProdutos>
		</ProvedorMensagens>
	);
}
