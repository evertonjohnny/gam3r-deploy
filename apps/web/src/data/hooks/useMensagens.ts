import { ContextoMensagens } from "../contexts/ContextoMensagens";
import { useContext } from "react";

export function useMensagens(){
    const contexto = useContext(ContextoMensagens)

    if(!contexto){
        throw new Error("O hook useMensagens deve ser usado dentro do ContextoMensagens")
    }

    return contexto


}