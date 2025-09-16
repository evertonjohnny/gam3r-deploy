type Body = Record<string,any>
type Headers = Record<string,string>

type RequisicaoProps={
    metodo: "GET" | "POST" | "PATCH" | "DELETE"
    url:string
    body?:Body
    headers?:Headers
}

class ErroDoBackend extends Error{
    constructor(public mensagem:string){
        super(mensagem)
    }
}

export default class Requisicao{
    private static async generica({metodo, url, body, headers}:RequisicaoProps){
        try{
            const resposta  = await fetch(url, {
                method:metodo,
                headers,
                body: JSON.stringify(body)
            })

            const dados = await resposta.json()

            if (dados.erro){
                throw new ErroDoBackend(dados.erro.mensagem)
            }

            return dados
        } catch (e){
            if (e instanceof ErroDoBackend){
                throw e
            }
            throw new Error(`Falha ao tentar acessar o servidor. Tente novamente mais tarde`)
        }
    }


    static async get(url:string, headers?:Headers){
        return Requisicao.generica({
            metodo:"GET",
            url:url,
            headers
        })
    }

    static async post(url:string, body:Body, headers?:Headers){
        return Requisicao.generica({
            metodo:"POST",
            url,
            body,
            headers:{
                "Content-Type":"application/json",
                ...headers
            }
        })
    }


    static async patch(url:string, body:Body, headers?:Headers){
        return Requisicao.generica({
            metodo:"PATCH",
            url,
            body,
            headers:{
                "Content-Type":"application/json",
                ...headers
            }
        })
    }

    static async delete(url:string, headers?:Headers){
        return Requisicao.generica({
            metodo:"DELETE",
            url:url,
            headers
        })
    }
}