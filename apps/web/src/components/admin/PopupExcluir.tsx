import { Produto } from "@gstore/core";
import Botao from "../shared/Botao";
import { IconAlertCircle } from "@tabler/icons-react";

interface PopupExcluirProps {
	excluir: () => void;
	setExibirExcluir: (valor: boolean) => void;
	produto: Produto;
}

export default function PopupExluir({
	excluir,
	setExibirExcluir,
	produto,
}: PopupExcluirProps) {
	return (
		<div className="absolute inset-0 backdrop-blur-sm z-10 flex items-center justify-center bg-violet-dark/70">
			<div className="bg-violet-700 border-2 border-emerald-500 rounded-xl p-6 m-4 shadow-lg">
				<div className="flex flex-col items-center text-sm md:text-md gap-2">
					<IconAlertCircle size={48} className="text-pink-500" />
					<span className="text-lg md:text-xl font-bold text-white text-center">
						Confirmar Exclusão
					</span>
					<p className="text-violet-200 text-center">
						Tem certeza que deseja excluir <strong>{produto.nome}</strong>?
					</p>
					<p className="text-pink-400 font-bold text-center">
						Esta ação não pode ser desfeita.
					</p>
				</div>

				<div className="flex gap-4 w-full mt-5 items-center justify-center">
					<Botao
						className="bg-pink-700 border-pink-700 hover:bg-pink-800 hover:border-emerald-500 py-4"
						onClick={excluir}
					>
						<span>Excluir</span>
					</Botao>
					<Botao
						className="bg-sky-700 border-sky-700 hover:bg-sky-800 hover:border-emerald-500 py-4"
						onClick={() => setExibirExcluir(false)}
					>
						<span>Cancelar</span>
					</Botao>
				</div>
			</div>
		</div>
	);
}
