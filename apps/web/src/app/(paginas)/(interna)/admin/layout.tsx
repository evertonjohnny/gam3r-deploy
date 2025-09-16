import MenuAdmin from "@/components/admin/MenuAdmin";

export default function Layout(props: any) {
	return (
		<div className="container">
			<MenuAdmin />
			<div>{props.children}</div>
		</div>
	);
}
