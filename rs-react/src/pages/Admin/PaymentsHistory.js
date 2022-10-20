import React, {useEffect} from 'react'
import { Spinner } from '../../assets/Spinner';
import {HeaderPage, TablePayments} from "../../components/Admin"
import {usePayment} from "../../hooks"

export function PaymentsHistory() {
    const {loading, payments, getPayments} = usePayment();

    useEffect(() => {getPayments()},[])

  return (
    <>
    <HeaderPage title="Historial de pagos" />
    {loading ? (
        <Spinner></Spinner>
    ) : (
        <TablePayments payments={payments} />
    )}
    </>
  )
}
