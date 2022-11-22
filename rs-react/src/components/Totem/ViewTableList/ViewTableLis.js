import React, {useState, useEffect} from 'react';
import { size } from 'lodash';
import { Card,Image } from 'react-bootstrap';
import {FcClock} from 'react-icons/fc';
import classNames from "classnames";
import { ReactComponent as IcTable } from "../../../assets/mesa3 copia.svg";
import { getOrdersByTableApi } from '../../../api/orders';
import { ORDER_STATUS } from '../../../utils/constants';
import {usePayment} from "../../../hooks";
import QRCode from "qrcode.react";

import "./ViewTableLis.css";

export function ViewTableLis(props) {
    const {table, reload} = props;
    const [orders, setOrders] = useState([]);
    const [tableBusy, setTableBusy] = useState(false)
    const [tableOrderDone, setTableOrderDone] = useState(false)
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
        (async() => {
          const response = await getOrdersByTableApi(table.id, ORDER_STATUS.LISTO)
          if(size(response) > 0) setTableOrderDone(response);
          else setTableOrderDone(false);
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
    // <div className='div-atras-mesas '>
        <div className='div-mesas-totem col-3'>
            <Card id='flip-front-totem'>
              <Card.Body>
              <Card.Title id='title-card-totem'>Mesa {table.number}</Card.Title>
                {size(orders) > 0 ? (
                    <div className='procesos-totem'><p><FcClock/></p></div>
                  ) : null }
                    {pendingPayment && (
                    <div></div>
                  )}
                <Card.Text  id='ubi-cap'>
                    <h10> <b>Ubicación:</b>  {table.ubicacion}</h10>
                    <h11> <b>Capacidad de mesa:</b> {table.cantidad_sillas}</h11>
                </Card.Text>
                <IcTable id='mesa-totem'
                  className={classNames({
                  pending: size(orders) > 0,
                  busy: tableBusy,
                  "pending-payment": pendingPayment,
                  done:tableOrderDone
                  })}/>
              </Card.Body>  
            </Card>
              <Card id='flip-back-totem'>
                <Card.Body>
                {size(orders) > 0 || tableBusy || pendingPayment || tableOrderDone ?  (
                    <div>
                      <Card.Text>
                        Esta mesa está ocupada ahora, por favor selecciona otra.
                      </Card.Text>
                    </div>
                  ) : (
                    <div>
                      <Card.Text>
                        Escanea este código QR que corresponde a la mesa que seleccionaste, así podrás ver nuestra carta.
                      </Card.Text>
                      <QRCode value={`${window.location.origin}/client/${table.number}`} />
                    </div>
                  )  }                
              </Card.Body>
            </Card>
        </div>

    // </div>
  )
}

