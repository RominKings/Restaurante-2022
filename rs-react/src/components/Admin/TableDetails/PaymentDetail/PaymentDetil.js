import React from 'react'
import { usePayment, useOrder } from '../../../../hooks'
import {Table, Button} from "react-bootstrap"
import {GrCreditCard} from "react-icons/gr"
import {FaRegMoneyBillAlt} from "react-icons/fa"

export function PaymentDetil(props) {
    const {payment, orders, openCloseModal, onReloadOrders} = props;
    const {closePayment} = usePayment();
    const {closeOrder} = useOrder();

    const getIconPayment = (key) => {
        if (key === "CARD") return <GrCreditCard/>;
        if (key === "CASH") return <FaRegMoneyBillAlt/>;
        return null;
    }

    const onCloseTable = async () => {
        const result = window.confirm("¿Cerrar mesa para nuevo cliente?");
        if(result) {
            await closePayment(payment.id);

            for await (const orders of orders) {
                await closeOrder(orders.id);
            }

            onReloadOrders();
            openCloseModal();
        }
    }

  return (
    <div className='payment-detail'>
        <Table striped>
      <thead>
        <tr>
          <th>Mesa:</th>
          <td>{payment.table_data.number}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Total:</th>
          <td> ${payment.totalPayment}</td>
        </tr>
        <tr>
          <th>Forma de pago:</th>
          <td>{getIconPayment(payment.paymentType)}</td>
        </tr>
      </tbody>
    </Table>
    <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={onCloseTable}>Marcar como pagado y cerrar mesa</Button>
    </div>
    </div>
  )
}
