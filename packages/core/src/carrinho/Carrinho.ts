import { Produto } from "../produto";
import { ItemCarrinho } from "./ItemCarrinho";

export class Carrinho{
    constructor(readonly itens: ItemCarrinho[] = []){}

    adicionarItem(produto:Produto){
        const item = this.buscaPorProduto(produto)
        if(item){
            return new Carrinho(this.alterarQuantidadeItem(produto, 1))

        } else {
            return new Carrinho([...this.itens, {produto, quantidade:1}])
        }
    }

    removerItem(produto:Produto){
        const item = this.buscaPorProduto(produto)
        if(!item) return this

        return new Carrinho(this.alterarQuantidadeItem(produto, -1))
    }

    removerProduto(produto:Produto){
        const item = this.buscaPorProduto(produto)
        if (!item) return this

        return new Carrinho(this.itens.filter(item=>item.produto.id!==produto.id))
    }

    limpar(){
        return new Carrinho()
    }

    get qtdeDeItens(){
        return this.itens
        .map(item=>item.quantidade).reduce((a,b)=>a+b,0)
    }

    get valorTotal(){
        return this.itens
        .map((item)=>item.produto.precoPromocional* item.quantidade)
        .reduce((a,b)=>a+b, 0)
    }

    get valorTotalCheio(){
        return this.itens
        .map((item)=>item.produto.precoBase* item.quantidade)
        .reduce((a,b)=>a+b, 0)
    }

    private buscaPorProduto(produto:Produto): ItemCarrinho | undefined{
        return this.itens.find((item)=>item.produto.id === produto.id)
    }
    
    private alterarQuantidadeItem(produto:Produto, diferenca:number){
        return this.itens.map((item)=>{
            if (item.produto.id === produto.id ){
                return {...item, quantidade: item.quantidade + diferenca}
            }
            return item
        }).filter(items=>items.quantidade > 0)
    }
}