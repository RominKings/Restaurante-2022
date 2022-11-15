import React, {useEffect, useState} from 'react'
import { size } from 'lodash';
import { ReactComponent as IcTable } from "../../../../assets/mesa3.svg";
import { Card,Badge } from 'react-bootstrap';
import {FcViewDetails} from 'react-icons/fc';
import classNames from "classnames";
import { getOrdersByTableApi } from '../../../../api/orders';
import { ORDER_STATUS } from '../../../../utils/constants';
import {usePayment} from "../../../../hooks";
import { Link } from "react-router-dom";
import "./TableAdmin.css";

export function TableAdmin(props) {
  const {table, reload} = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false)
  const [tablePreparing, setTablePreparing] = useState(false)
  const [pendingPayment, setPendingPayment] = useState(false)
  const {getPaymentByTable} = usePayment();
  console.log(orders);

  useEffect(() => {
    (async() => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDIENTE)
      setOrders(response);
    })()
  }, [reload])

  useEffect(() => {
    (async() => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.ENTREGADO)
      if(size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })()
  }, [reload])

  useEffect(() => {
    (async() => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PREPARANDO)
      if(size(response) > 0) setTablePreparing(response);
      else setTablePreparing(false);
    })()
  }, [reload])

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.id)
      if(size(response) > 0) setPendingPayment(true)
      else setPendingPayment(false)
    })()
  }, [reload])
  

  return (


    <Link className='table-admin col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2' to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Badge bg="secondary">{size(orders)}</Badge>
        // <Card bsPrefix='card' ><Card.Body>{size(orders)}</Card.Body></Card>
      ) : null }

        {pendingPayment && (
          <Card bsPrefix='card'><Card.Body><Card.Title><FcViewDetails/></Card.Title></Card.Body></Card>
        )}

      <IcTable id="mesa"
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
          "pending-payment": pendingPayment,
          preparing:tablePreparing
      })} />
      <p>Mesa {table.number}</p>
    </Link>
 
  )
}
