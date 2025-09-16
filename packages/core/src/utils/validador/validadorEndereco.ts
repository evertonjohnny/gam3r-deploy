import { Endereco } from "../../usuario";
import { Validador } from "./validador";

export function validarEndereco(endereco:Endereco){
    const logradouro = Validador.string(endereco.logradouro, {
        tamanhoMaximo:100,
        tamanhoMinimo:3,
        nomeCampo:"Logradouro"
    })
    const numero = Validador.numero(endereco.numero, {
        nomeCampo:"Número",
        proibirNegativos:true
    })
    const complemento = Validador.string(endereco.complemento, {
        tamanhoMaximo:50,
        tamanhoMinimo:3,
        nomeCampo:"Complemento"
    })
    const bairro = Validador.string(endereco.bairro, {
        tamanhoMaximo:50,
        tamanhoMinimo:3,
        nomeCampo:"Bairro"
    })
    const cidade = Validador.string(endereco.cidade, {
        tamanhoMaximo:50,
        tamanhoMinimo:3,
        nomeCampo:"Cidade"
    })
    const estado = Validador.string(endereco.estado, {
        tamanhoMaximo:2,
        tamanhoMinimo:2,
        nomeCampo:"Estado"
    })

    return{
        logradouro, numero, complemento, bairro, cidade, estado
    }
}