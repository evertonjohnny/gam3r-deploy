import { ContextoAutenticacao } from "../contexts/ContextoAutenticacao";
import { useContext } from "react";

export function useAutenticacao(){
    const contexto = useContext(ContextoAutenticacao)

    if(!contexto){
        throw new Error("O hook useAutenticacao deve ser usado dentro do ContextoAutenticacao")
    }

    return contexto


}