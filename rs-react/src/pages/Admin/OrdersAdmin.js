import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { HeaderPage, TableListAdmin } from "../../components/Admin";
import { useTable } from '../../hooks';

export function OrdersAdmin() {
  const {loading, tables, getTables} = useTable();

  useEffect(() => { getTables() }, [])
  console.log(tables);

  return (
    <>
        <HeaderPage title="Restaurante siglo XXI"/>
        {loading ? (<Spinner animation="border" variant="success" />) : (
          <TableListAdmin tables={tables}/>
        )}
    </>
  )
}