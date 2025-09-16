import { Endereco } from "./Endereco";
export interface Usuario{
    id?: number;
    nome:string;
    email:string;
    senha:string;
    cpf?:string;
    endereco?:Endereco
}