import { Endereco, Usuario } from "@gstore/core";
import { Injectable } from "@nestjs/common";
import { connect } from "http2";
import { PrismaProvider } from "src/db/prisma.provider";

@Injectable()
export class UsuarioPrisma{
    constructor(private readonly prisma:PrismaProvider){}

    async pegaUsuarioCompleto(email:string){
        const usuario = await this.prisma.usuario.findUnique(
            {
                where:{email}, 
                include:{endereco:{
                    omit:{
                        id:true
                    }
                }},
                omit:{
                    id:true,
                    senha:true,
                    enderecoId:true
                }
            }
        )
        return usuario
    }

    async pegarIdPorEmail(email:string){
        const resultado = await this.prisma.usuario.findUnique(
            {where:{email}}
        )

        return resultado ? Number(resultado.id) : null
    }

    async pegarHashSenhaPorEmail(email:string){
        const resultado = await this.prisma.usuario.findUnique(
            {where:{email}}
        )

        return resultado? resultado.senha : null
    }

    async atualizarUsuario(email:string, dados:Partial<Usuario>){
        const resultado = await this.prisma.usuario.update(
            {
                where:{ email },
                data: dados as any
            }
        )
        return resultado
    }

    async salvarEndereco(idUsuario:number, endereco:Endereco){
        const resultado = await this.prisma.endereco.upsert({
            where:{id:endereco.id ?? -1},
            create:{
                ...(endereco as any),
                usuario:{
                    connect:{id:idUsuario}
                }
            },
            update:endereco as any
        })
        return resultado
    }
}