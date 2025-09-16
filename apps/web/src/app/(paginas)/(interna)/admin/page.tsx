import TituloPagina from "@/components/admin/TituloPagina";
import { IconLockAccess } from "@tabler/icons-react";

export default function Admin() {
	return (
		<div className="flex flex-col w-full justify-center items-center my-10 gap-1">
			<TituloPagina texto="Administração" icone={IconLockAccess} />
			<p className="text-center">Interafce de administração da Gam3r.store</p>
		</div>
	);
}
