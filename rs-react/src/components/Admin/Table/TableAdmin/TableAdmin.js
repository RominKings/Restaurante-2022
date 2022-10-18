import React, {useEffect, useState} from 'react'
import { size } from 'lodash';
import { ReactComponent as IcTable } from "../../../../assets/mesa3.svg";
import { Card } from 'react-bootstrap';
import classNames from "classnames";
import { getOrdersByTableApi } from '../../../../api/orders';
import { ORDER_STATUS } from '../../../../utils/constants';
import { Link } from "react-router-dom";
import "./TableAdmin.css";

export function TableAdmin(props) {
  const {table, reload} = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false)
  console.log(orders);

  useEffect(() => {
    (async() => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING)
      setOrders(response);
    })()
  }, [reload])

  useEffect(() => {
    (async() => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.DELIVERED)
      if(size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })()
  }, [reload])

  return (
    <Link className='table-admin col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2' to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Card bsPrefix='card' ><Card.Body>{size(orders)}</Card.Body></Card>
      ) : null }
      <IcTable id="mesa"
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
      })} />
      <p>Mesa {table.number}</p>
    </Link>
  )
}
