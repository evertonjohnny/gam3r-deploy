import { Endereco } from "../usuario";

export interface DadosEntrega extends Endereco{
    nome:string
    email:string
    cpf:string
}