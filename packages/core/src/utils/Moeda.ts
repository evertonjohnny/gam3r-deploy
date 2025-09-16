export default class Moeda{
    static formatar(valor:number, localizacao:string = "pt-BR", moeda:string='BRL'){
        const valorFinal= (valor ?? 0).toLocaleString(localizacao, {
            style:'currency',
            currency:moeda
        })

        return valorFinal
    }
}