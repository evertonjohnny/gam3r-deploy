import { IconCancel, IconCheck, IconPencil } from "@tabler/icons-react";
import Botao from "../shared/Botao";
import { cn } from "@/utils/cn";

interface BotoesEdicaoProps {
	editando: boolean;
	setEditando: (b: boolean) => void;
	persistirAlteracao: () => Promise<boolean>;
	resetar?: () => void;
}

export default function BotoesEdicao({
	editando,
	setEditando,
	persistirAlteracao,
	resetar,
}: BotoesEdicaoProps) {
	return (
		<div className="flex gap-3 justify-end items-center my-2">
			<Botao
				onClick={async () => {
					if (editando) {
						const sucesso = await persistirAlteracao();
						if (sucesso) {
							setEditando(false);
						}
					} else {
						setEditando(true);
					}
				}}
				className={cn("self-end", {
					"bg-violet-600 hover:bg-violet-700 border-violet-500": !editando,
					"bg-emerald-500 border-emerald-600": editando,
					"hover:bg-emerald-600 hover:border-emerald-700": editando,
				})}
			>
				{editando ? (
					<>
						<IconCheck />
						<span className="hidden sm:inline">Salvar</span>
					</>
				) : (
					<>
						<IconPencil /> <span className="hidden sm:inline">Editar</span>
					</>
				)}
			</Botao>

			{editando && (
				<Botao
					onClick={() => {
						setEditando(false);
						resetar?.();
					}}
					className="self-end border-pink-500 bg-pink-600 hover:bg-pink-700 hover:border-pink-600"
				>
					<IconCancel /> <span className="hidden sm:inline">Cancelar</span>
				</Botao>
			)}
		</div>
	);
}
