"use client";
import InputEspecificacoes from "@/components/admin/InputEspecificacoes";
import InputTags from "@/components/admin/InputTags";
import SessaoFormulario from "@/components/admin/SessaoFormulario";
import TituloPagina from "@/components/admin/TituloPagina";
import Botao from "@/components/shared/Botao";
import Input, { InputProps } from "@/components/shared/Input";
import { cn } from "@/utils/cn";
import { Produto } from "@gstore/core";
import {
	IconCurrency,
	IconDeviceFloppy,
	IconEdit,
	IconInfoCircle,
	IconListDetails,
	IconPhone,
	IconPhoto,
	IconTag,
	IconX,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useProdutos } from "@/data/hooks/useProdutos";
import { useRouter } from "next/navigation";
import Loader from "@/components/template/Loader";
export default function ProdutoAdmin() {
	const produtoPadrao: Produto = {
		id: -1,
		nome: "Novo Notebook",
		descricao:
			"O Novo Notebook é um notebook gamer poderoso, ideal para jogos pesados e multitarefas.",
		marca: "Melhor Marca",
		modelo: "AN515-54-58CL",
		imagem:
			"https://firebasestorage.googleapis.com/v0/b/formacao-dev.appspot.com/o/lancamentos%2Fgam3rstore%2Facer-nitro-5.png?alt=media&token=094ba6a8-1a4d-414a-b32c-c176bfeaca8e",
		videoReview:
			"https://www.youtube.com/embed/8NQFr9De3lU?si=s_lN2KTQresD-36Y",
		tags: ["Novo", "Imperdível"],
		especificacoes: {
			Peso: "2.5 Kg",
			Tela: "15.6 polegadas Full HD",
			Memória: "16GB DDR4",
			destaque: "NVIDIA GeForce RTX 2060",
			Processador: "Intel Core i5-9300H",
			Armazenamento: "512GB SSD",
			"Placa de Vídeo": "NVIDIA GeForce RTX 2060",
		} as any,
		precoBase: 6499.99,
		precoPromocional: 5999.99,
		menorPreco: 4850.9,
		maiorPreco: 9800.8,
		precoMedio: 6503.7,
		nota: 3.5,
	};

	const { salvarProduto } = useProdutos();
	const router = useRouter();
	const { id } = useParams();
	const [produto, setProduto] = useState<Produto | null>(null);
	const estaCriando = id === "novo";
	const { pegarProdutoPorId } = useProdutos();

	async function inicializaForm() {
		if (!estaCriando && id) {
			const p = await pegarProdutoPorId(+id);
			setProduto(p);
			return;
		}
		setProduto(produtoPadrao);
	}

	useEffect(() => {
		inicializaForm();
	}, []);

	function setCampoProduto(chave: string, valor: any) {
		if (!produto) return;
		setProduto({ ...produto, [chave]: valor });
	}

	if (!produto) {
		return <Loader />;
	}
	const propsBasicos: InputProps[] = [
		{
			texto: "Nome",
			valor: produto.nome,
			setValor: (valor: any) => {
				setCampoProduto("nome", valor);
			},
		},
		{
			texto: "Marca",
			valor: produto.marca,
			setValor: (valor: any) => {
				setCampoProduto("marca", valor);
			},
		},
		{
			texto: "Modelo",
			valor: produto.modelo,
			setValor: (valor: any) => {
				setCampoProduto("modelo", valor);
			},
		},
		{
			texto: "Nota (0 a 5)",
			tipo: "number",
			valor: produto.nota,
			setValor: (valor: any) => {
				setCampoProduto("nota", valor);
			},
		},
	];

	const propsMidia = [
		{
			texto: "URL da Imagem",
			valor: produto.imagem,
			setValor: (valor: any) => {
				setCampoProduto("imagem", valor);
			},
		},
		{
			texto: "URL do Vídeo de Review",
			valor: produto.videoReview,
			setValor: (valor: any) => {
				setCampoProduto("videoReview", valor);
			},
		},
	];

	const propsPreco: InputProps[] = [
		{
			texto: "Preço Base (R$)",
			tipo: "number",
			valor: produto.precoBase,
			setValor: (valor: any) => {
				setCampoProduto("precoBase", valor);
			},
		},
		{
			texto: "Preço Promocional (R$)",
			tipo: "number",
			valor: produto.precoPromocional,
			setValor: (valor: any) => {
				setCampoProduto("precoPromocional", valor);
			},
		},
		{
			texto: "Menor Preço (R$)",
			tipo: "number",
			valor: produto.menorPreco,
			setValor: (valor: any) => {
				setCampoProduto("menorPreco", valor);
			},
		},
		{
			texto: "Maior Preço (R$)",
			tipo: "number",
			valor: produto.maiorPreco,
			setValor: (valor: any) => {
				setCampoProduto("maiorPreco", valor);
			},
		},
		{
			texto: "Preço Médio (R$)",
			tipo: "number",
			valor: produto.precoMedio,
			setValor: (valor: any) => {
				setCampoProduto("precoMedio", valor);
			},
		},
	];

	return (
		<div className="lg:w-4/5 mx-auto">
			<TituloPagina
				texto={estaCriando ? "Adicionar Novo Produto" : "Editar Produto"}
				icone={IconEdit}
			/>

			<div className="p-5 bg-violet-dark/50 rounded-xl">
				<SessaoFormulario
					icone={IconInfoCircle}
					titulo="Informações Básicas"
					propsInputs={propsBasicos}
				>
					<div className="md:col-span-2">
						<Input
							texto="Descrição"
							valor={produto.descricao}
							setValor={(valor: any) => {
								setCampoProduto("descricao", valor);
							}}
							className="col-span-2"
						/>
					</div>
				</SessaoFormulario>
				<SessaoFormulario
					icone={IconPhoto}
					titulo="Mídia"
					propsInputs={propsMidia}
					unicaColuna
				/>
				<SessaoFormulario
					icone={IconCurrency}
					titulo="Preços"
					propsInputs={propsPreco}
				/>
				<SessaoFormulario icone={IconTag} titulo="Tags" unicaColuna>
					<InputTags
						tags={produto.tags}
						setTags={(valor: any) => {
							setCampoProduto("tags", valor);
						}}
					/>
				</SessaoFormulario>
				<SessaoFormulario
					icone={IconListDetails}
					titulo="Especificações"
					unicaColuna
				>
					<InputEspecificacoes
						especificacoes={produto.especificacoes}
						setEspecificacoes={(valor: any) =>
							setCampoProduto("especificacoes", valor)
						}
					/>
				</SessaoFormulario>
				<div className="flex flex-col sm:flex-row gap-4">
					<Botao
						onClick={async () => {
							const sucesso = await salvarProduto(produto);
							if (sucesso) {
								router.push("/admin/produtos");
							}
						}}
						className="px-6 font-medium py-5 w-full text-lg"
					>
						<IconDeviceFloppy size={20} />
						Salvar Produto
					</Botao>
					<Link
						href={"/admin/produtos"}
						className={cn(
							"botao border-2 bg-pink-700 border-pink-700",
							"hover:bg-pink-600 hover:border-pink-800",
							"text-white px-6 py-5 w-full text-lg font-medium"
						)}
					>
						<IconX size={20} /> Cancelar
					</Link>
				</div>
			</div>
		</div>
	);
}
