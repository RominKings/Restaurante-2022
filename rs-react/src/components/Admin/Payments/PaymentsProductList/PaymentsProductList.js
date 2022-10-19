import React, {useEffect, useState} from 'react'
import { map } from 'lodash';
import { Image } from 'react-bootstrap';
import {useOrder} from "../../../../hooks"
import "./PaymentsProdcutList.css";

export function PaymentsProductList(props) {
    const {payment} = props;
    const {getOrdersByPayment} = useOrder();
    const [orders, setOrders] = useState([])

    useEffect(() => {
      (async () => {
        const response = await getOrdersByPayment(payment.id)
        setOrders(response);
      })()
    }, [])
    

  return (
    <div className='payment-product-list'>
        {map(orders, (order) => (
            <div className='payment-product' key={order.id}>
                <div>
                    <Image src={order.product_data.image} sizes="sm"></Image>
                    <span>{order.product_data.title}</span>
                </div>
                <span>${order.product_data.price}</span>
            </div>
        ))}
        
    </div>
  )
}
