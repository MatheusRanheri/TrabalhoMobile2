import { URLbase } from "./base";

export async function getCliente() {
    try {
        const response = await fetch(`${URLbase}/Cliente`);
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.log("Erro ao buscar clientes", error);
        return [];
    }
}

export async function addCliente(cliente) {
    try {
        const response = await fetch(`${URLbase}/Cliente`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(cliente)
        });

        return await response.json();
    } catch (error) {
        console.log("Erro ao cadastrar cliente", error);
        return null;
    }
}

export async function updateCliente(id, clienteAtualizado){
    try{
        const response = await fetch(`${URLbase}/Cliente/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(clienteAtualizado)
        });

        return await response.json();
    }catch(error){
        console.error('Erro ao atualizar o cliente: ', error);
        return null;
    }
}

export async function deletaCliente(id) {
    try{
        await fetch(`${URLbase}/Cliente/${id}`, {
            method: "DELETE"
        });

        return true;
    }catch(error){
        console.error('Erro ao deletar cliente', error);
        return false;
    }
}
