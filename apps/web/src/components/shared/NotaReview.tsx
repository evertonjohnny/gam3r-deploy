import {
	IconStar,
	IconStarFilled,
	IconStarHalfFilled,
} from "@tabler/icons-react";

interface NotaReviewProps {
	nota: number;
	tamanho?: number;
}

export default function NotaReview({ nota, tamanho }: NotaReviewProps) {
	function notaParaEstrelas(nota: number) {
		const tamanhoFinal = tamanho ?? 12;
		const estrelas = [];
		for (let i = 1; i <= 5; i++) {
			if (nota >= i) {
				estrelas.push(<IconStarFilled key={i} size={tamanhoFinal} />);
			} else if (nota >= i - 0.5) {
				estrelas.push(<IconStarHalfFilled key={i} size={tamanhoFinal} />);
			} else {
				estrelas.push(<IconStar key={i} size={tamanhoFinal} />);
			}
		}
		return estrelas;
	}

	return (
		<div className="flex gap-0.5 text-emerald-400">
			{notaParaEstrelas(nota)}
		</div>
	);
}
