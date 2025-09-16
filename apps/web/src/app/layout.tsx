import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Gam3r.Store",
	description: "A sua loja Gam3r",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${montserrat.variable} antialiased`}>{children}</body>
		</html>
	);
}
