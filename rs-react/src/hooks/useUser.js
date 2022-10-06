import { getMeApi, getUsersApi, addUserApi, updateUserApi, deleteUserApi } from "../api/user";
import { useState } from "react";
import {useAuth} from ".";

//PARA QUE SOLO SE CONTROLEN LAS PETICIONES HTTP EN UN SOLO LUGAR Y TENER UN MAYOR CONTROL
export function useUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const { auth } = useAuth();
  
  const getMe = async (token) => {
    try {
      const response = await getMeApi(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

//ME DEVUELVE LOS USUARIOS
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth.token);
      setLoading(false);
      setUsers(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  //AGREGA USUARIOS
  const addUser = async (data) => {
    try {
      setLoading(true);
      await addUserApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      await updateUserApi(id, data, auth.token);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUser(id, auth.token);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

    return{
        loading,
        error,
        users,
        getMe,
        getUsers,
        addUser,
        updateUser,
        deleteUser
    };
}