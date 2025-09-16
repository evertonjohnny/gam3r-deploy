import { Injectable,  } from '@nestjs/common';
import { ProdutoPrisma } from './produto.prisma';
import { Produto, validarProduto } from '@gstore/core';

@Injectable()
export class ProdutoService {
  private readonly QTDE_POR_PAGINA = 8
  constructor(private readonly prisma:ProdutoPrisma){}

  async obterPaginas(pesquisa?:string){
    const qtdeProdutos = await this.prisma.contarProdutos(pesquisa)
    const paginas = Math.ceil(qtdeProdutos / this.QTDE_POR_PAGINA)
    return paginas
  }

  async obterPagina(pagina:number=1, pesquisa:string){
    return this.prisma.obterPagina(pagina, this.QTDE_POR_PAGINA, pesquisa)
  }

  async criar(produto:Produto){
    const produtoValidado = validarProduto(produto)
    await this.prisma.criar(produtoValidado)
    return {mensagem:"Produto Criado com Sucesso"}
  }

  async atualizar(id:number, produto:Produto){
    const produtoValidado = validarProduto(produto)
    await this.prisma.atualizar(id,produtoValidado)
    return {mensagem: "Produto Atualizado com Sucesso"}
  }

  async deletar(id:number){
    await this.prisma.deletar(id)
    return {mensagem: "Produto Excluído com Sucesso"}
  }
}
