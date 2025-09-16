import { Produto } from "../../produto";
import { Validador } from "./validador";

export function validarProduto(produto: Partial<Produto>){
    const nome = Validador.string(produto.nome,{
        tamanhoMaximo:100,
        tamanhoMinimo:3,
        nomeCampo:"Nome"
    })

    const descricao = Validador.string(produto.descricao,{
        tamanhoMaximo:300,
        tamanhoMinimo:10,
        nomeCampo:"Descrição"
    })

    const marca = Validador.string(produto.marca,{
        tamanhoMaximo:50,
        tamanhoMinimo:2,
        nomeCampo:"Marca"
    })

    const modelo = Validador.string(produto.modelo,{
        tamanhoMaximo:50,
        tamanhoMinimo:2,
        nomeCampo:"Modelo"
    })

    const imagem = Validador.url(produto.imagem,{
        nomeCampo:"URL da Imagem"
    })

    const videoReview = Validador.url(produto.videoReview,{
        nomeCampo:"URL do Vídeo de Review"
    })

    const precoBase = Validador.numero(produto.precoBase,{
        proibirNegativos:true,
        nomeCampo:"Preço base"
    })
        
    const precoPromocional = Validador.numero(produto.precoPromocional,{
        proibirNegativos:true,
        nomeCampo:"Preço Promocional"
    })

    const menorPreco = Validador.numero(produto.menorPreco,{
        proibirNegativos:true,
        nomeCampo:"Menor Preço"
    })

    const maiorPreco =  Validador.numero(produto.maiorPreco,{
        proibirNegativos:true,
        nomeCampo:"Maior Preço"
    })

    const precoMedio = Validador.numero(produto.precoMedio,{
        proibirNegativos:true,
        nomeCampo:"Preço Médio"
    })

    const nota =  Validador.numero(produto.nota,{
        proibirNegativos:true,
        maximo:5,
        nomeCampo:"Nota"
    })

    const tags = produto.tags?.map((tag)=>Validador.string(tag, {
        tamanhoMaximo:20,
        nomeCampo:`Tag "${tag}"`
    })) ?? []

    const especificacoes = {
        destaque: modelo ?? nome,
        ...Object.fromEntries(
            Object.entries(produto.especificacoes ?? {}).map(([chave, valor])=>{
                const chaveValidada = Validador.string(`${chave}`, {
                    nomeCampo:`Especificação ${chave}`,
                    tamanhoMinimo:3
                })
                const valorValidado = Validador.string(`${valor}`, {
                    nomeCampo:`Valor da especificação ${chave}`,
                    tamanhoMinimo:1
                })
                return [chaveValidada, valorValidado]
            })
        )
    }


    	return {
		nome,
		descricao,
		marca,
		modelo,
		imagem,
		videoReview,
		tags,
		especificacoes,
		precoBase,
		precoPromocional,
		menorPreco,
		maiorPreco,
		precoMedio,
		nota,
	};
}