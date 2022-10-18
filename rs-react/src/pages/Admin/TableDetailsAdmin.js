import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import { useOrder, useTable } from '../../hooks'
import {HeaderPage, AddOrderFormAdmin} from '../../components/Admin'
import {ModalBasic} from '../../components/Common';
import { ListOrderAdmin } from '../../components/Admin/TableDetails';
import {Spinner} from 'react-bootstrap'

export function TableDetailsAdmin() {
    const [reloadOrders, setReloadOrders] = useState(false)
    const {id} = useParams();
    const {loading, orders, getOrdersByTable} = useOrder();
    const {table, getTable} =useTable();

    const [showModal, setShowModal] = useState(false)
    
    useEffect(() => {
      getOrdersByTable(id, "", "ordering=-status,created_at")
    }, [id,reloadOrders])

    useEffect(() => {getTable(id)}, [id])

    const onReloadOrders = () => setReloadOrders((prev) => !prev);
    const openCloseModal = () => setShowModal((prev) => !prev);

  return (
    <div>
        <HeaderPage title={`Mesa ${table ? table.number : ""}`}
        btnTitle="Añadir Pedido" btnClick={openCloseModal}/>
        {loading ? (
            <Spinner animation="border" variant="info" />
        ) : (
            <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders}/>
        )}
        <ModalBasic  show={showModal} onClose={openCloseModal} title="Generar pedido">
            <AddOrderFormAdmin idTable={id} openCloseModal={openCloseModal}/>
        </ModalBasic>
    </div>
  )
}
