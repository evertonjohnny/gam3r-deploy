import { useContext } from "react";
import { ContextoCarrinho } from "../contexts/ContextoCarrinho";

export function useCarrinho(){
    const contexto = useContext(ContextoCarrinho)

    if(!contexto){
        throw new Error("O hook useCarrinho deve ser usado dentro do ContextoCarrinho")
    }

    return contexto
}