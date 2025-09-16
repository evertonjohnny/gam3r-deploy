import { InfoLogin } from "../tipos";
import { Usuario } from "../../usuario";
import { AlteracaoSenha, InfoCadastro } from "../tipos";
import { Validador } from "./validador";
import { validarEndereco } from "./validadorEndereco";

export function validarDadosLogin(dados:InfoLogin){
    const email = Validador.email(dados.email)
    const senha = Validador.senha(dados.senha)

    return { email, senha}
}

export function validarDadosCadastro(dados:InfoCadastro){
    const nome = Validador.string(dados.nome, {
        nomeCampo:"Nome", tamanhoMinimo:3
    })
    const {email, senha} = validarDadosLogin({email:dados.email, senha:dados.senha})

    return {nome, email, senha}
}

export function validarUsuarioParcial(usuario:Partial<Usuario>){
    const nome = usuario.nome && Validador.string(usuario.nome, {
        nomeCampo:"Nome", tamanhoMinimo:3
    })
    const cpf = usuario.cpf && Validador.CPF(usuario.cpf)
    const email = usuario.email && Validador.email(usuario.email)
    const endereco = usuario.endereco && validarEndereco(usuario.endereco)

    const resultado: Partial<Usuario> = {}

    if (nome) resultado.nome = nome
    if (email) resultado.email = email
    if (cpf) resultado.cpf = cpf
    if (endereco) resultado.endereco = endereco
    
    return resultado
}

export function validarTrocaDeSenha(dados: AlteracaoSenha){
    const {senhaAtual, novaSenha} = dados
    Validador.senha(senhaAtual, {
        nomeCampo:"Senha atual"
    })
    Validador.senha(novaSenha, {
        nomeCampo:"Nova senha"
    })
    return {senhaAtual, novaSenha}
}
