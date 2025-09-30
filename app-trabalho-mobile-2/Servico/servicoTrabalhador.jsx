import axios from "axios";
import { URLbase } from "./base";

export async function getTrabalhador() {
    try{
        const response = await axios.get(`${URLbase}/Trabalhador`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar trabalhadores', error);
        return [];
    }   
}

export async function addTrabalhador(trabalhador) {
    try{
        const response = await axios.post(`${URLbase}/Trabalhador`, trabalhador);
        return response.data;
    }catch(error){
        console.error('Erroa ao cadastrar trabalhador', error);
        return null;
    }
}

export async function updateTrabalhador(id, trabalhadorAtualizado) {
    try{
        const response = await axios.put(`${URLbase}/Trabalhador/${id}`, trabalhadorAtualizado);
        return response.data;
    }catch(error){
        console.error('Erroa ao atualizar Trabalhador', error);
        return null;
    }
    
}

export async function deletaTrabalhador(id) {
    try{
        await axios.delete(`${URLbase}/Trabalhador/${id}`);
        return true;
    }catch(error){
        console.error('Erro ao deletar trabalhador', error);
        return false;
    }
}