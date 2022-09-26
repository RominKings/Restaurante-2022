import { useState } from "react";
import { getCategoriasApi } from "../api/categorias";

//VA A BUSCAR TODOS LOS DATOS 
export function useCategorias() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categorias, setCategorias] =useState(null);

    const getCategorias = async () => {
        try {
            setLoading(true);
            const response = await getCategoriasApi();
            setCategorias(response);
            
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };
    return {
        loading,
        error,
        categorias,
        getCategorias,
    }
}