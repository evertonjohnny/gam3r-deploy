import cookie from "js-cookie"

export default class CookieSessao{
    private static readonly NOME_COOKIE = "credencial-gam3r"

    static criar(valor:any){
        cookie.set(CookieSessao.NOME_COOKIE, JSON.stringify(valor), {
            expires:1,
            sameSite:"None",
            secure:true
        })
    }

    static pegar(){
        const dados = cookie.get(CookieSessao.NOME_COOKIE)
        return dados ? JSON.parse(dados): null
    }

    static pegarToken(){
        const dados = CookieSessao.pegar()
        return dados?.token ? dados.token : null
    }

    static atualizar(novoNome:string){
        const dados = CookieSessao.pegar()
        if(dados){
            const novo = {token:dados.token, nome:novoNome, admin:dados.admin}
            CookieSessao.criar(novo)
            return novo
        }
        return null
    }

    static limpar(){
        cookie.remove(this.NOME_COOKIE)
    }
}