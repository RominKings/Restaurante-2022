import React, { useEffect } from 'react';
import { Spinner } from '../../assets/Spinner';
import { HeaderPage, TableListAdmin } from "../../components/Admin";
import { useTable } from '../../hooks';

export function OrdersAdmin() {
  const {loading, tables, getTables} = useTable();

  useEffect(() => { getTables() }, [])
  console.log(tables);

  return (
    <>
        <h1 className='text-center' >"Restaurante Siglo XXI"</h1>
        <br></br>
        {loading ? (<Spinner></Spinner>) : (
          <TableListAdmin tables={tables}/>
        )}
    </>
  )
}
