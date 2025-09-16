import { IconUfo } from "@tabler/icons-react";

export default function Loader() {
	return (
		<div className="flex flex-col justify-center items-center text-emerald-400 my-auto animate-pulse">
			<IconUfo size={200} stroke={0.8} />
			<div className="text-2xl font-bold">Carregando...</div>
		</div>
	);
}
