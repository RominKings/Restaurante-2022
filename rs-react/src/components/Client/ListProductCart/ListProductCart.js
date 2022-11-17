import React, { useState, useEffect } from "react";
import { Image, Button, Card, CardGroup } from "react-bootstrap";
import {IoMdClose} from "react-icons/io"
import {BsTrash} from "react-icons/bs";
import { map, forEach } from "lodash";
import { useParams, useNavigate} from "react-router-dom";
import { useOrder, useTable } from "../../../hooks";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import "./ListProductCart.css";
import Swal from 'sweetalert2'

// CommonJS

export function ListProductCart(props) {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const Swal = require('sweetalert2')
  console.log(products);

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(3));
  }, [products]);

  const removeProduct = (index) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres eliminar este producto del carrito?',
      text: "No podrás cancelar esta petición, pero podrás volver a agregar este u otro producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Quiero eliminarlo!',
      cancelButtonText: 'No, me he arrepentido',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '¡Perfecto!',
          'Has eliminado este producto exitosamente del carrito',
          'success',          
        )
        removeProductCartApi(index);
        onReloadCart();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'No se ha eliminado el producto',
          'error'
        )
      }
    })
  };

  const createOrder = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres realizar el pedido?',
      text: "No podrás cancelar esta petición",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Quiero esto!',
      cancelButtonText: 'No, algo ha cambiado...',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const tableData = await getTableByNumber(tableNumber);
        const idTable = tableData[0].id;

        swalWithBootstrapButtons.fire(
          '¡Perfecto!',
          'Tu pedido se ha realizado con éxito',
          'success',          
        )
        for await (const product of products) {
        await addOrderToTable(idTable, product.id);
        cleanProductCartApi();
        navigate(`/client/${tableNumber}/orders`);
        }
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
    <div className="row-div-cart">
      {map(products, (product, index) => (
        <div key={index} 
        className=""
        >
          <Card id="card-card" className="bg-dark text-white">
            <Card.Img  id="card-img-cart" src={product.image} alt="Card image" />
            <Card.ImgOverlay >
              <Card.Title id="card-title-cart">{product.title}</Card.Title>
              <Card.Text id="card-price-cart" >1 x $ {product.price}</Card.Text>
              <Button id="card-button-cart" variant="light" name="close" onClick={() => removeProduct(index)}> 
                <IoMdClose/></Button>
            </Card.ImgOverlay>
          </Card>
        </div>
      ))}
      <div className="div-lv">
        
      </div>
      <div 
      className="div-total"
      >
        <Button className=" fixed-bottom" variant="success"onClick={createOrder}>
          Total: ${total}

          <h4>Realizar pedido</h4>
        </Button>
      </div>
    </div>




  );
}
