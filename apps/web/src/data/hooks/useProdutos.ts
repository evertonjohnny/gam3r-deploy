import { ContextoProdutos } from "../contexts/ContextoProdutos";
import { useContext } from "react";

export function useProdutos(){
    const contexto = useContext(ContextoProdutos)

    if(!contexto){
        throw new Error("O hook useProdutos deve ser usado dentro do ContextoAutenticacao")
    }

    return contexto


}