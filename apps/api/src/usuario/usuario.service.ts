import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsuarioPrisma } from './usuario.prisma';
import { AlteracaoSenha, Usuario, validarUsuarioParcial, validarTrocaDeSenha } from '@gstore/core';
import { compare, hash } from "bcrypt"
@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioPrisma:UsuarioPrisma){}
  async pegar(email:string) {
    const usuario = await this.usuarioPrisma.pegaUsuarioCompleto(email)
    
    if (!usuario){
      throw new NotFoundException("Usuário não encontrado")
    }

    return usuario;
  }
  
  async atualizar(email:string, dados: Partial<Usuario>) {
    const dadosValidados = validarUsuarioParcial(dados)
    
    if (dadosValidados.endereco){
      const {endereco} = dadosValidados
      delete dadosValidados.endereco
      const idUsuario = await this.usuarioPrisma.pegarIdPorEmail(email)

      if (!idUsuario){
        throw new NotFoundException("Usuário não foi encontrado")
      }

      const resultado = await this.usuarioPrisma.salvarEndereco(idUsuario,endereco)
    }

    if(dadosValidados.email){
      const jaExiste = await this.usuarioPrisma.pegarIdPorEmail(dadosValidados.email)
      if(jaExiste){
        throw new BadRequestException("Não é possível utilizar esse e-mail")
      }
    }


    if(dadosValidados){
      await this.usuarioPrisma.atualizarUsuario(email, dadosValidados)
    }

    return { mensagem: "Dados atualizados com sucesso!"}
  }

  async atualizarSenha(email:string, dados:AlteracaoSenha){
    const {senhaAtual, novaSenha} = validarTrocaDeSenha(dados)
    const senhaHash = await this.usuarioPrisma.pegarHashSenhaPorEmail(email)
    
    if(!senhaHash){
      throw new NotFoundException("Usuário não foi encontrado")
    }

    const senhaCorreta = await compare(senhaAtual, senhaHash)

    if(!senhaCorreta){
      throw new BadRequestException("Senha atual está incorreta")
    }

    const novaSenhaHash = await hash(novaSenha, 10)

    this.usuarioPrisma.atualizarUsuario(email, {senha:novaSenhaHash})
    
    return {mensagem: "Senha foi alterada com sucesso!"}
  }
}
