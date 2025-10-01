import axios from "axios";
import { URLbase } from "./base";

export async function LoginServico(email, senha){

    try{

        const verificaCli = await axios.get(`${URLbase}/Cliente`, {
            params: {email, senha}
        });
        if(verificaCli.data.length > 0){
            return{tipo: "cliente", usuario: verificaCli.data[0]};
        }

        const verificaTra = await axios.get(`${URLbase}/Trabalhador`, {
            params: {email, senha}
        });
        if(verificaTra.data.length > 0){
            return {tipo: "trabalhador", usuario: verificaTra.data[0]};
        }

        return null;
    }catch(error){
        console.error('Erro, email ou senha incorretos', error);
        return null;
    }
}