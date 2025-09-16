import { PedidoInput, Usuario } from '@gstore/core';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';
import { Status } from '@gstore/core';

@Injectable()
export class PedidoPrisma {
    constructor(readonly prisma:PrismaProvider){}

    async pegarUsuarioPorEmail(email:string){
        const usuario = await this.prisma.usuario.findUnique({
            where: {email},
            include:{
                endereco:{
                    select:{
                        logradouro:true,
                        numero:true,
                        complemento:true,
                        bairro:true,
                        cidade:true,
                        estado:true
                    }
                }
            }
        })

        return usuario as Partial<Usuario>
    }

    async pegarProdutosComPreco(pedidoRecebido:PedidoInput){
        const produtosIds = pedidoRecebido.itens.map(item=>item.produtoId)

        const produtos = await this.prisma.produto.findMany({
            where:{
                id: {in: produtosIds}
            }, select:{
                id:true,
                precoPromocional:true,
                precoBase:true
            }
        })

        const itensComPreco = pedidoRecebido.itens.map((item)=>{
            const produto = produtos.find(p=>p.id === item.produtoId)

            if (!produto){
                throw new Error(`Não é possível realizar a compra de ${item.nome}`)
            }

            return {
                produtoId: item.produtoId,
                quantidade:item.quantidade,
                precoUnitario: produto.precoPromocional ?? produto.precoBase
            }
        })

        return itensComPreco
    }

    async salvar(
        pedidoInput:PedidoInput, 
        usuario:Partial<Usuario>, 
        itensComPreco:{
            produtoId:number,
            quantidade:number,
            precoUnitario:number
        }[]
    ){
        const valorTotal = itensComPreco.reduce(
            (total, item)=>total + item.precoUnitario * item.quantidade, 
            0)
        
        const pedido = await this.prisma.pedido.create({
            data:{
                ...pedidoInput,
                ...usuario.endereco,
                usuarioId: usuario.id,
                status: Status.RECEBIDO,
                valorTotal,
                itens:{
                    create:itensComPreco
                }
            } as any
        })

        return pedido
    }

    async pegarPedidosDoUsuario(email:string, pagina:number){
        const limite = 5
        const offset = (pagina -1)*limite
        const pedidos = await this.prisma.pedido.findMany({
            where:{
                usuario:{
                    email
                }
            },
            include:{
                itens:{
                    include:{
                        produto:true
                    }
                }
            },
            orderBy:{
                dataCompra:'desc'
            },
            omit:{
                usuarioId:true
            },
            skip:offset,
            take:limite
        })

        return pedidos
    }

    async pegarPedidos(pagina:number){
        const limite = 6
        const offset = (pagina - 1)*limite
        const pedidos = await this.prisma.pedido.findMany({
            include:{
                itens:{
                    include:{
                        produto:true
                    }
                }
            },
            orderBy:{
                dataCompra:'desc'
            },
            omit:{
                usuarioId:true
            },
            skip:offset,
            take:limite
        })

        return pedidos
    }

    async atualizarStatus(id:number, status:Status){
        await this.prisma.pedido.update({
            where:{id},
            data:{
                status
            }
        })
    }
}
