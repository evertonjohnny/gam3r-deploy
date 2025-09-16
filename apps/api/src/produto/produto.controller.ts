import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProdutoPrisma } from './produto.prisma';
import { Produto } from '@gstore/core';
import { ProdutoService } from './produto.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('produtos')

export class ProdutoController {

    constructor(readonly produtoPrisma: ProdutoPrisma,
        private readonly produtoService:ProdutoService
    ){}

    @Get()
    async obterPagina(@Query("p") p:number, @Query("pesquisa") pesquisa:string): Promise<Produto[]>{
        return this.produtoService.obterPagina(p, pesquisa)
    }

    @Get("qtdePaginas")
    async obterPaginas(@Query("pesquisa") pesquisa:string){
        return this.produtoService.obterPaginas(pesquisa)
    }

    @Get(":id")
    async obterUm(@Param("id") id:string):Promise<Produto|null>{
        return this.produtoPrisma.obterUm(+id)
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Post()
    criar(@Body() produto:Produto){
        return this.produtoService.criar(produto)
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Patch(":id")
    atualizar(@Param("id") id:string,@Body() produto:Produto){
        return this.produtoService.atualizar(+id, produto)
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Delete(":id")
    deletar(@Param("id") id:string){
        return this.produtoService.deletar(+id)
    }

}
