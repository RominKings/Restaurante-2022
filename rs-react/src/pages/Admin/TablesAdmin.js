import { ErrorMessage } from "formik";
import React, { useEffect } from "react";
import { HeaderPage, TableTablesAdmin } from "../../components/Admin";
import { useTables } from "../../hooks";
export function TablesAdmin(){
    const {loading,tables,getTables}=useTables();

    useEffect(() => getTables() ,[]);
    console.log(tables)
    console.error(tables)
    return (
        <>
            <HeaderPage title="Mesas" btnTitle="Crear nueva mesa"/>
            <TableTablesAdmin tables={tables}/>
        </>
    )
}