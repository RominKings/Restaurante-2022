import React, {useEffect} from 'react'
import { Spinner } from 'react-bootstrap';
import {HeaderPage, TablePayments} from "../../components/Admin"
import {usePayment} from "../../hooks"

export function PaymentsHistory() {
    const {loading, payments, getPayments} = usePayment();

    useEffect(() => {getPayments()},[])

  return (
    <>
    <HeaderPage title="Historial de pagos" />
    {loading ? (
        <Spinner animation="border" />
    ) : (
        <TablePayments payments={payments} />
    )}
    </>
  )
}
