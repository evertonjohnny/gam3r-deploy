import { Usuario } from "../usuario"
import { FormaPagamento } from "./FormaPagamento"
import { ItemPedido } from "./ItemPedido"
import { Status } from "./Status"

export interface Pedido {
    id:number
    dataCompra:Date
    valorTotal:number
    status:Status
    formaPagamento: FormaPagamento
    usuario:Usuario
    logradouro:string
    numero: number | string
    complemento?:string
    bairro:string
    cidade:string
    estado:string
    itens: ItemPedido[]
}