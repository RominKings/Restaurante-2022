import React, { useEffect } from "react";
import { HeaderPage } from "../../components/Admin";
import { useTables } from "../../hooks";

export function TablesAdmin(){
    const {loading,tables,getTables}=useTables()

    useEffect(() => getTables() ,[]);
    console.log(tables)
    return (
        <>
            <HeaderPage title="Mesas" btnTitle="Crear nueva mesa"/>
        </>
    )
}