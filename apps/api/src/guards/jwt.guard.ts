import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface Requisicao extends  Request{
  emailUsuario:string
  ehAdmin:boolean
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req:Requisicao = context.switchToHttp().getRequest()
    const token = req.headers.authorization?.split(" ")[1] ?? ""

    try{
        const tokenDecodificado = this.jwtService.decode(token)
        if(tokenDecodificado.exp < Math.round(Date.now()/1000)){
          throw Error()
        }
        console.log(tokenDecodificado)
        req.emailUsuario = tokenDecodificado.email
        req.ehAdmin = tokenDecodificado.admin
    } catch {
      throw new UnauthorizedException("Você não está logado. Faça login novamente.")
    }
   

    return true;
  }
}
