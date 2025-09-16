import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

function extraiMensagemHTTP(erro:HttpException){
  const resposta = erro.getResponse()
  const temMensagem = resposta && typeof resposta === "object" && 'message' in resposta
  return temMensagem ? resposta.message : "Houve um problema desconhecido"
}

function extraiMensagemErro(erro:Error){
    return erro.message
}

@Catch()
export class FormataFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const resposta: Response = host.switchToHttp().getResponse()
    const ehHttpException = exception instanceof HttpException
    const status: number = ehHttpException? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const mensagem = ehHttpException ? extraiMensagemHTTP(exception) : extraiMensagemErro(exception as Error)
    
    resposta.status(status).json({
      erro:{
        mensagem,status
      }
    })
  }
}
