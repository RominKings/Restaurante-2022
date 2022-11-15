import React, {useState, useEffect} from 'react';
import { size } from 'lodash';
import { Card, Badge,Image } from 'react-bootstrap';
import {FcClock} from 'react-icons/fc';
import classNames from "classnames";
import { ReactComponent as IcTable } from "../../../assets/mesa3 copia.svg";
// import { Spinner2 } from '../../../assets/Spinner2';
import { getOrdersByTableApi } from '../../../api/orders';
import { ORDER_STATUS } from '../../../utils/constants';
import {usePayment} from "../../../hooks";

import "./ViewTableLis.css";

export function ViewTableLis(props) {
    const {table, reload} = props;
    const [orders, setOrders] = useState([]);
    const [tableBusy, setTableBusy] = useState(false)
    const [pendingPayment, setPendingPayment] = useState(false)
    const {getPaymentByTable} = usePayment();
console.log(orders)

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
        (async () => {
          const response = await getPaymentByTable(table.id)
          if(size(response) > 0) setPendingPayment(true)
          else setPendingPayment(false)
        })()
      }, [reload])

      console.log(tableBusy)

  return (
    <div className='col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2 div-atras-mesas '>
        <div className='table-totem div-mesas'>
          <h6 className=' text-center'>Mesa {table.number}</h6>
          
            {size(orders) > 0 ? (
                <div className='procesos-totem'>
                  <p><FcClock/></p>
                </div>
                // <Card bsPrefix='card' ><Card.Body>{size(orders)}</Card.Body></Card>
            ) : null }

                  {pendingPayment && (
                <div>
                  {/* <Spinner2 className='row mx-auto spin-totem'></Spinner2> */}
                  <span>La mesa se desocupara pronto...</span>
                
                  </div>
                )}
                
            <div className=''>
            <IcTable
                className={classNames({
                pending: size(orders) > 0,
                busy: tableBusy,
                "pending-payment": pendingPayment
            }) }
            /></div>
            <hr></hr>
            <div className='ubi-cap'>
              
              <h10 > <b>Ubicación:</b>  {table.ubicacion}</h10>
              <h11 > <b>Capacidad de mesa:</b> {table.cantidad_sillas}</h11>
            </div>
            <hr></hr>
            
            
        </div>

    </div>
  )
}
