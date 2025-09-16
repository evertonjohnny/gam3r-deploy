import { Produto } from '@gstore/core';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class ProdutoPrisma {
    constructor(readonly prisma:PrismaProvider){}

    async obterPagina(pagina:number, qtdeProdutos:number, pesquisa:string): Promise<Produto[]>{
        const produtos = await this.prisma.produto.findMany({
            where:{
                nome:{
                    contains: pesquisa ?? "",
                    mode:"insensitive"
                }
            },
            skip: (pagina-1) * qtdeProdutos,
            take: qtdeProdutos
        })
        return produtos as Produto[]
    }

    async obterUm(id:number): Promise<Produto|null>{
        const produto = await this.prisma.produto.findUnique({where:{id}})
        return (produto as Produto) ?? null
    }

    async contarProdutos(pesquisa?:string){
        return await this.prisma.produto.count(
            {where:{
                nome:{
                    contains:pesquisa ?? "",
                    mode:"insensitive"
                }
            }}
        )
    }

    async criar(produto:Omit<Produto, "id">){
        await this.prisma.produto.create({
            data:produto
        })
        return
    }

    async atualizar(id:number, produto:Omit<Produto, "id"> ){
        await this.prisma.produto.update({
            where:{id},
            data:produto
        })
        return
    }

    async deletar(id:number){
        await this.prisma.produto.delete({where:{id}})
    }
}
