import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { map, size, forEach, wrap } from "lodash";
import { OrderHistoryItem } from "../../components/Client";
import { ModalConfirm } from "../../components/Common";
import { useOrder, useTable, usePayment } from "../../hooks";
import Swal from 'sweetalert2'

export function OrdersHistory() {
  const [idTable, setIdTable] = useState(null);
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const { createPayment, getPaymentByTable } = usePayment();



  const openCloseModal = () => setShowTypePayment((prev) => !prev);

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdTable(idTableTemp);

      getOrdersByTable(idTableTemp, "", "ordering=-status,-created_at");
    })();
  }, []);

  
  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, [idTable]);

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);

    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(3),
      paymentType,
      statusPayment: "PENDING",
    };

    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    window.location.reload();
  };

  function pagar_efectivo(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres pagar con efectivo?',
      text: "No podras cancelar esta petición",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Quiero esto!',
      cancelButtonText: 'No, algo ha cambiado...',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {

        swalWithBootstrapButtons.fire(
          '¡Perfecto!',
          'Tu cuenta la pagarás en efectivo, pronto un empleado se acercará...',
          'success',          
        )
        onCreatePayment("CASH")
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'No se ha realizado tu pedido',
          'error'
        )
      }
    })

  };

  function pagar_tarjeta(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres pagar con tarjeta?',
      text: "No podrás cancelar esta petición",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Quiero esto!',
      cancelButtonText: 'No, algo ha cambiado...',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {

        swalWithBootstrapButtons.fire(
          'Perfecto!',
          'Tu cuenta la pagarás con tarjeta, pronto un empleado se acercará...',
          'success',          
        )
        onCreatePayment("CARD")
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'No se ha realizado tu pedido',
          'error'
        )
      }
    })
  };
  return (
    <div>
      <h1>Historial de pedidos</h1>
      <div className="row-products">
      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : size(orders) === 0 ?(
        
        <div style={{ textAlign: "center"}}>
          <p> Aún no has pedido algo </p>
          <Link to={`/client/${tableNumber}/cart`}>
            <Button variant='dark'>Ver carrito</Button>
          </Link>
          <br></br>
          <br></br>
          <Link to={`/client/${tableNumber}`}>
            <Button variant='dark'>Ver categorías</Button>
          </Link>
        </div>
      ) : ( 

        <>
          {size(orders) > 0 && (
            <Button variant='success'

              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0
                ? "La cuenta ya está pedida"
                : "Pedir la cuenta"}
            </Button>
          )}

          {map(orders, (order) => (
            
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </>


      )}</div>

      <ModalConfirm
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        txtbtnCash="Efectivo"
        onCloseCard={pagar_efectivo}
        onClose={openCloseModal}
        txtbtnCard="Tarjeta"
        onCloseCash={pagar_tarjeta}
      />
    </div>
  );
}
