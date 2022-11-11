import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {forEach,size} from "lodash"
import { useOrder, useTable, usePayment } from '../../hooks'
import {HeaderPage, AddOrderFormAdmin} from '../../components/Admin'
import {ModalBasic} from '../../components/Common';
import {  PaymentDetil } from '../../components/Admin/TableDetails';
import{ListOrderAdmin} from '../../components/Admin/TableDetails/ListOrderAdmin'
import { Spinner } from '../../assets/Spinner';

export function TableDetailsAdmin() {
    const [reloadOrders, setReloadOrders] = useState(false)
    const [paymentData, setPaymentData] = useState(null)
    const {id} = useParams();
    const {loading, orders, getOrdersByTable, addPaymentToOrder} = useOrder();
    const {table, getTable} =useTable();
    const {createPayment, getPaymentByTable} = usePayment();

    const [showModal, setShowModal] = useState(false)
    
    useEffect(() => {
      getOrdersByTable(id, "", "ordering=-status,created_at")
    }, [id,reloadOrders])

    useEffect(() => {getTable(id)}, [id])

    useEffect(() => {
      (async () => {
        const response = await getPaymentByTable(id)
        if(size(response) > 0) setPaymentData(response[0])
      })();
    }, [reloadOrders])
    

    const onReloadOrders = () => setReloadOrders((prev) => !prev);
    const openCloseModal = () => setShowModal((prev) => !prev);

    const onCreatePayment = async () => {
      const result = window.confirm('¿Estas seguro de generar la cuenta de la mesa?');

      if(result) {
        let totalPayment = 0;
        forEach(orders, (order) => {
          totalPayment += Number(order.product_data.price);
        })

    const resultTypePayment = window.confirm('¿Pago con tarjeta pulsa OK y con efectivo pulsa CANCELAR?');
      
//SE PASAN PARAMETROS PARA SER ENVIADOS AL MOMENTO DE CREAR UNA CUENTA
        const paymentData = {
          table: id,
          totalPayment: totalPayment.toFixed(3),
          paymentType: resultTypePayment ? "CARD" : "CASH",
          statusPayment: "PENDING",
        };

        const payment = await createPayment(paymentData)

        for await (const order of orders) {
          await addPaymentToOrder(order.id, payment.id)
        }
        onReloadOrders();
      }
    }

  return (
    <div>
        <HeaderPage title={`Mesa ${table ? table.number : ""}`}
        btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"} btnClick={openCloseModal} btnTitleTwo={!paymentData ? "Generar cuenta" : null} btnClickTwo={onCreatePayment}/>
        {loading ? (
           <Spinner></Spinner>
        ) : (
            <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders}/>
        )}
        
        <ModalBasic  show={showModal} onClose={openCloseModal} title="Liberar Mesa">
        {paymentData ? (
          <PaymentDetil payment={paymentData} orders={orders} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders}/>
        ) : (
            <AddOrderFormAdmin idTable={id} openCloseModal={openCloseModal}/>
            )}
        </ModalBasic>
    </div>
  )
}
