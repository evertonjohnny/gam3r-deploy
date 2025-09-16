export interface Endereco{
    id?: number
    logradouro: string;
    numero: string | number
    complemento?:string
    bairro:string
    cidade:string
    estado:string
}