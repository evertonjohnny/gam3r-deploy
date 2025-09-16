import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InfoLogin, InfoCadastro } from '@gstore/core';
import { JwtGuard } from 'src/guards/jwt.guard';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() infoLogin: InfoLogin) {
    return this.authService.login(infoLogin);
  }

  @Post("cadastro")
  cadastro(@Body() infoCadastro:InfoCadastro) {
    return this.authService.cadastro(infoCadastro);
  }
  
}
