import React, {useEffect, useState} from 'react'
import { size } from 'lodash';
import { ReactComponent as IcTable } from "../../../../assets/mesa.svg";
import { Card } from 'react-bootstrap';
import classNames from "classnames";
import { getOrdersByTableApi } from '../../../../api/orders';
import { ORDER_STATUS } from '../../../../utils/constants';
import "./TableAdmin.css";

export function TableAdmin(props) {
  const {table} = props;
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    (async() => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING)
      setOrders(response);
    })()
  }, [])

  return (
    <div className='table-admin'>
      {size(orders) > 0 ? (
        <Card bsPrefix='card' bg='warning'><Card.Body>{size(orders)}</Card.Body></Card>
      ) : null }
      <h1><IcTable id="mesa" className={classNames({
        pending: size(orders) > 0,
      })} /></h1>
      <p>Mesa {table.number}</p>
    </div>
  )
}
