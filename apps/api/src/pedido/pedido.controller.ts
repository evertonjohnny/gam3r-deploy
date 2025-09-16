import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoInput, Status } from '@gstore/core';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { EmailUsuario } from 'src/decorators/email-usuario.decorator';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('pedidos')
@UseGuards(JwtGuard)
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  criar(@Body() pedidoInput: PedidoInput, @EmailUsuario() email:string) {
    return this.pedidoService.criar(pedidoInput, email);
  }

  @Get()
  pegarTodosDoUsuario(@EmailUsuario() email:string, @Query("p") pagina:number = 1) {
    return this.pedidoService.obterTodosDoUsuario(email, pagina);
  }

  @Get("/admin")
  @UseGuards(AdminGuard)
  pegarTodos(@Query("p") pagina:number = 1) {
    return this.pedidoService.obterTodos(pagina);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  atualizar(@Param('id') id: string, @Body() {status}:{status:Status}) {
    return this.pedidoService.atualizar(+id, status);
  }

}
