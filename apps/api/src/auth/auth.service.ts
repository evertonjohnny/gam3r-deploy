import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {hash, compare} from "bcrypt"
import { AuthPrisma } from './auth.prisma';
import { validarDadosCadastro, validarDadosLogin } from '@gstore/core';
import { InfoLogin, InfoCadastro } from '@gstore/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly authPrisma:AuthPrisma,
            private readonly jwtService:JwtService
  ){}
  async cadastro(infoCadastro:InfoCadastro) {
    const {nome, email, senha} = validarDadosCadastro(infoCadastro)

    const usuarioExiste = await this.authPrisma.pegarUsuarioPorEmail(email
    )

    if(usuarioExiste){
      throw new BadRequestException("Usuário já cadastrado")
    }

    const senhaHash = await hash(senha, 5)
    await this.authPrisma.salvar({
      nome,
      email,
      senha:senhaHash
    })

    return {mensagem: "Usuário criado com sucesso"}
  }

  async login(infoLogin:InfoLogin) {
    const {email, senha} = validarDadosLogin(infoLogin)

    const usuario = await this.authPrisma.pegarUsuarioPorEmail(email)

    if(!usuario){
      throw new NotFoundException("Usuário não encontrado")
    }

    const senhaCorreta = await compare(senha, usuario.senha)

    if (!senhaCorreta){
      throw new UnauthorizedException("Senha está incorreta")
    }

    const token = this.jwtService.sign({email, admin:usuario.admin})

    return {token, nome:usuario.nome, admin:usuario.admin};
  }

}
