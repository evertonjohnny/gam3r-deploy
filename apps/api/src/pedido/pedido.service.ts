import { Injectable, NotFoundException } from '@nestjs/common';
import { PedidoInput, Status, Usuario } from '@gstore/core';
import { PedidoPrisma } from './pedido.prisma';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma:PedidoPrisma){}

  async criar(pedidoInput:PedidoInput, email:string) {
    const usuario: Partial<Usuario> = await this.prisma.pegarUsuarioPorEmail(email)

    if (!usuario){
      throw new NotFoundException("Usuário não encontrado")
    }

    if(!usuario.endereco){
      throw new NotFoundException(`Endereço associado ao usuário com email ${email} não encontrado`)
    }

    const itensComPreco = await this.prisma.pegarProdutosComPreco(pedidoInput)

    await this.prisma.salvar(pedidoInput, usuario, itensComPreco)
    
    return {mensagem:"Pedido criado com sucesso"}
  }

  obterTodosDoUsuario(email:string, pagina:number) {
    return this.prisma.pegarPedidosDoUsuario(email, pagina);
  }

  obterTodos(pagina:number){
    return this.prisma.pegarPedidos(pagina)
  }

  async atualizar(id:number, novoStatus:Status){
    await this.prisma.atualizarStatus(id,novoStatus)
    return {mensagem:"Status do pedido foi atualizado com sucesso!"}
  }

}
