import Requisicao from "@/utils/Requisicao"
import { useCallback } from "react"
import { useMensagens } from "./useMensagens"
import CookieSessao from "@/utils/Cookie"

export default function useAPI(){
    const urlAPI = process.env.NEXT_PUBLIC_API_URL
    const urlBase = urlAPI?.endsWith("/") ? urlAPI.slice(0,-1) : urlAPI
    const {adicionarMensagemErro, adicionarMensagemSucesso} = useMensagens()


    function geraAuthorizationHeader(){
        const token = CookieSessao.pegarToken()
        return {
            "Authorization": `Bearer ${token}`
        }
    }

    const httpGet = useCallback(async function (caminho:string) {
        try{
            return await Requisicao.get(`${urlBase}${caminho}`, geraAuthorizationHeader())
        } catch (e:any){
            adicionarMensagemErro(e.message)
        }
    },[])

    const httpPost = useCallback(async function (caminho:string, body:any) {
        try{
            const resposta = await Requisicao.post(`${urlBase}${caminho}`, body, geraAuthorizationHeader())
             if(resposta.mensagem){
                adicionarMensagemSucesso(resposta.mensagem)
            }
            return resposta
        } catch (e:any){
            adicionarMensagemErro(e.message)
        }
    },[])

    const httpPatch = useCallback(async function (caminho:string, body:any) {
        try{
            const resposta =  await Requisicao.patch(`${urlBase}${caminho}`, body, geraAuthorizationHeader())
            if(resposta.mensagem){
                adicionarMensagemSucesso(resposta.mensagem)
            }
            return resposta
        } catch (e:any){
            adicionarMensagemErro(e.message)
            return false
        }
    },[])

    const httpDelete = useCallback(async function (caminho:string) {
        try{
            const resposta =  await Requisicao.delete(`${urlBase}${caminho}`, geraAuthorizationHeader())
            if(resposta.mensagem){
                adicionarMensagemSucesso(resposta.mensagem)
            }
            return resposta
        } catch (e:any){
            adicionarMensagemErro(e.message)
        }
    },[])

    return {httpGet, httpPost, httpPatch, httpDelete}

}