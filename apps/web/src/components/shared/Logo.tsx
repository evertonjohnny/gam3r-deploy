import Link from "next/link";
import Image from "next/image";

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-3">
			<Image
				src="/logo.png"
				height={60}
				width={60}
				alt="logo da loja"
				className="hidden sm:block"
			/>
			<Image
				src="/logo-texto.png"
				height={0}
				width={230}
				alt="Gam3r.Store"
				className="w-30 sm:w-50"
			/>
		</Link>
	);
}
