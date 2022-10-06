import { useState } from "react";
import { getProductApi } from "../api/product";

export function useProduct() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState(null)

    const getProduct = async () => {
        try {
            setLoading(true);
            const response = await getProductApi();
            setLoading(false)
            setProducts(response)
        } catch (error) {
            throw error;
        }
    };

    return {
        loading,
        error,
        products,
        getProduct,
    }
}