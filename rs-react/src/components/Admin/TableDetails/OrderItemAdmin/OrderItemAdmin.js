import React from 'react'
import { Button, Image } from 'react-bootstrap'
import classNames from "classnames"
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from '../../../../utils/constants';
import { useOrder } from '../../../../hooks';
import "./OrderItemAdmin.css"

export function OrderItemAdmin(props) {
  const {order, onReloadOrders} = props;
  const {title, image} = order.product_data;

  console.log(order.product_data)
  const {checkDeliveredOrder} = useOrder();
  
  const oncheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id);
    onReloadOrders();
  }

  return (
    <div className={classNames('order-item-admin', {
      [order.status.toLowerCase()]: true,
    })}>
      <div className='order-item-admin-time'>
        <span>{moment(order.created_at).format("HH:mm")}</span>{" - "}
        <span>{moment(order.created_at).startOf('second').fromNow()}</span>
      </div>
      <div className='order-item-admin-product'>
        <Image src={image}/>
        <p>{title}</p>
      </div>
      {order.status == ORDER_STATUS.PENDING && (
        <Button variant="primary" onClick={oncheckDeliveredOrder}>Marcar entregado</Button>
      )}
    </div>
  )
}
