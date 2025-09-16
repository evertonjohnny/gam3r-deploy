import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { EmailUsuario } from 'src/decorators/email-usuario.decorator';
import { Usuario, AlteracaoSenha } from '@gstore/core';
@Controller('usuario')
@UseGuards(JwtGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  pegar(@EmailUsuario() email:string) {
    return this.usuarioService.pegar(email);
  }

  @Patch()
  atualizar(@EmailUsuario() email:string, @Body() dados: Partial<Usuario>) {
    return this.usuarioService.atualizar(email, dados);
  }

  @Patch("/senha")
  atualizarSenha(@EmailUsuario() email:string, @Body() dados: AlteracaoSenha) {
    return this.usuarioService.atualizarSenha(email, dados);
  }

}
