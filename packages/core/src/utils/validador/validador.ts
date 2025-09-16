export class Validador{
    static string(texto:any, opcoes?:{
        nomeCampo?:string, tamanhoMinimo?:number, tamanhoMaximo?:number
    }){
        const textoTrim = texto.trim()
        const {nomeCampo, tamanhoMaximo, tamanhoMinimo} = opcoes || {}
        if (typeof textoTrim !== "string"){
            throw new Error(`${nomeCampo ?? "Valor"} não é uma string`)
        }

        if (tamanhoMinimo && textoTrim.length < tamanhoMinimo){
            throw new Error(`${nomeCampo ?? "Valor"} tem pouco tamanho`)
        }

        if (tamanhoMaximo && textoTrim.length > tamanhoMaximo){
            throw new Error(`${nomeCampo ?? "Valor"} tem muito tamanho`)
        }

        return textoTrim
    }

    static url(valor?:string, opcoes?:{nomeCampo?:string}){
        if (!valor){
            throw new Error(`${opcoes?.nomeCampo?? "URL"} é obrigatória`)
        }

        const regexURL = /^(https?:\/\/)/
        if(!regexURL.test(valor)){
            throw new Error(`${opcoes?.nomeCampo?? "URL"} é inválido`)
        }

        return valor
    }

    static email(texto:any){
        Validador.string(texto, {
            nomeCampo:"Email",
            tamanhoMinimo: 5,
            tamanhoMaximo:25
        })

        const [inicio, fim] = texto.split("@")

        if(!inicio?.length || !fim?.length){
            throw new Error("Email está inválido")
        }

        return texto
    }

    static senha(texto:string, opcoes?:{nomeCampo?:string}){
        Validador.string(texto, {
            nomeCampo:opcoes?.nomeCampo ?? "Senha",
            tamanhoMinimo: 6
        })

        return texto
    }

    static CPF(valor:string){
        const cpf = Validador.string(
            valor.replace(".", "").replace("-",""), 
            {
            nomeCampo:"CPF",
            tamanhoMaximo:11,
            tamanhoMinimo:11
            }
        )

        const regex = /^\d{11}$/

        if (!regex.test(cpf)){
            throw new Error("CPF Inválido")
        }

        return cpf
    }

    static numero(valor:any, opcoes?:{proibirNegativos?:boolean, nomeCampo?:string, maximo?:number}){
        const {proibirNegativos, nomeCampo, maximo} = opcoes ?? {}
        const valorNumero = Number(valor)
       
        if(isNaN(valorNumero)){
            throw new Error(`${nomeCampo ?? "Valor"} não é um número válido`)
        }

        if (proibirNegativos && valorNumero < 0){
            throw new Error(`${nomeCampo ?? "Valor"} não pode ser negativo`)
        }

        if(maximo && (valorNumero > maximo)){
            return maximo
        }

        return valorNumero
    }
}