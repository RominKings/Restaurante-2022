import { useState } from "react";
import { getProductApi, addProductApi, updateProductApi, deleteProductApi, getProductsByCategoryApi,getProductByIdApi } from "../api/product";
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

    const updateProduct = async (id, data) => {
        try {
            setLoading(true);
            await updateProductApi(id, data, auth.token);
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true)
            await deleteProductApi(id, auth.token);
            setLoading(false);
        } catch (error) {
            setError(error)
            setLoading(false);
        }
    }
    const getProductById = async (id) => {
        try {
          const product = await getProductByIdApi(id);
          return product;
        } catch (error) {
          setError(error);
        }
      };
    
      const getProductsByCategory = async (idCategory) => {
        try {
          setLoading(true);
          const response = await getProductsByCategoryApi(idCategory);
          setLoading(false);
          setProducts(response);
        } catch (error) {
          setLoading(false);
          setError(error);
        }
      };

    return {
        loading,
        error,
        products,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory
    }
}