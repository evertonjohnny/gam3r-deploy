"use client";
import { useEffect } from "react";
import { useAutenticacao } from "@/data/hooks/useAutenticacao";
import { useRouter } from "next/navigation";
export default function Layout(props: any) {
	const { temCredencial } = useAutenticacao();
	const router = useRouter();

	useEffect(() => {
		if (!temCredencial()) {
			router.push("/");
		}
	}, []);

	return <>{props.children}</>;
}
