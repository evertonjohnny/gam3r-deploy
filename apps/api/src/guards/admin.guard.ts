import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface Requisicao extends  Request{
  emailUsuario:string
  ehAdmin:boolean
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req:Requisicao = context.switchToHttp().getRequest()

    if(req.ehAdmin){
      return true
    } else{
      throw new UnauthorizedException("Você não está autorizado a acessar esse recurso")
    }
    
  }
}
