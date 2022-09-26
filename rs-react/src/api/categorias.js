import { BASE_API } from "../utils/constants";

// PARA LISTAR TODAS LAS CATEGORIAS 
export async function getCategoriasApi() {
    try {
        const url = `${BASE_API}/api/categorias/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}