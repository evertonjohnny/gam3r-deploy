export interface InfoLogin{
    email:string
    senha:string
}

export interface InfoCadastro extends InfoLogin{
    nome:string
}

export interface AlteracaoSenha{
    novaSenha:string
    senhaAtual:string
}