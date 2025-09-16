import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const EmailUsuario = createParamDecorator((
    _:any, ctx:ExecutionContext
)=>{
    const requisicao = ctx.switchToHttp().getRequest()
    return requisicao.emailUsuario
})