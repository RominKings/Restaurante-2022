import { useState } from "react";
import { getProductApi, addProductApi } from "../api/product";
import {useAuth} from "./"

export function useProduct() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState(null)
    const { auth } = useAuth();

    const getProduct = async () => {
        try {
            setLoading(true);
            const response = await getProductApi();
            setLoading(false)
            setProducts(response)
        } catch (error) {
            setError(error)
            setLoading(false)
            throw error;
        }
    };

    const addProduct = async (data) => {
        try {
            setLoading(true);
            await addProductApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
            throw error;
        }
    }

    return {
        loading,
        error,
        products,
        getProduct,
        addProduct,
    }
}