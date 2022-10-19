import React, {useState} from 'react'
import {GrCreditCard} from "react-icons/gr"
import {FaRegMoneyBillAlt} from "react-icons/fa"
import { Table, Button } from 'react-bootstrap'
import {ImEye} from 'react-icons/im';
import { map } from "lodash";
import moment from "moment";
import { ModalBasic } from '../../../Common';
import { PaymentsProductList } from '../../../Admin';


export function TablePayments(props) {
    const {payments} = props;
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)

    const getIconPaymentName = (key) => {
        if(key === "CARD") return <GrCreditCard/>;
        if(key === "CASH") return <FaRegMoneyBillAlt/>;
        return null;
    }

    const openCloseModal = () => setShowModal((prev) => !prev);

    const showDetails= (payment) => {
        setTitleModal(`Pedidos de la mesa ${payment.table_data.number}`);
        setContentModal(<PaymentsProductList payment={payment}/>)
        openCloseModal();
    }

  return (
    <>
        <Table striped bordered hover size="sm" className='table-payments-admin'>
            <thead>
                <tr>
                <th>ID</th>
                <th>Mesa</th>
                <th>Total</th>
                <th>Tipo de pago</th>
                <th>Fecha</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {map(payments, (payment, index) => (
                    <tr key={index}>
                        <td>{payment.id}</td>
                        <td>{payment.table_data.number}</td>
                        <td>${payment.totalPayment}</td>
                        <td>{getIconPaymentName(payment.paymentType)}</td>
                        <td>{moment(payment.created_at).format("DD/MM/YYYY - HH:mm")}</td>
                        <td align='right'>
                            <Button variant="secondary" onClick={() => showDetails(payment)}><ImEye/></Button>
                        </td>
                    </tr>
                ))}
            </tbody>

            <ModalBasic
                show={showModal}
                onClose={openCloseModal}
                title={titleModal}
                children={contentModal}
            />
        </Table>
    </>
  )
}
