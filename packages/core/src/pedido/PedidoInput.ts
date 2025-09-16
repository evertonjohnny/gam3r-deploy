import { FormaPagamento } from "./FormaPagamento";

export interface PedidoInput{
    itens:{
        quantidade:number;
        produtoId:number;
        nome:string
    }[],
    formaPagamento:FormaPagamento
}