import { useState } from "react";
import { size } from "lodash";
import {getTablesApi,addTableApi,updateTableApi,} from "../api/table";
import { useAuth } from "./useAuth";

export function useTable() {
  const {auth} = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState(null);
  const [table, setTable] = useState(null);

    const getTables = async () => {
        try {
            setLoading(true);
            const response= await getTablesApi(auth.token);
            setLoading(false);
            setTables(response);
        }catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const addTable = async (data) => {
      try {
        setLoading(true);
        await addTableApi(data, auth.token);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };


  const updateTable = async (id, data) => {
    try {
      setLoading(true);
      await updateTableApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };


  return {
    loading,
    error,
    tables,
    table,
    getTables,
    addTable,
    updateTable,
    
  };
}
