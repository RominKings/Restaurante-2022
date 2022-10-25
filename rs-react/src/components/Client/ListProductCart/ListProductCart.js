import React, { useState, useEffect } from "react";
import { Image, Button, Card, CardGroup } from "react-bootstrap";
import {IoMdClose} from "react-icons/io"
import {BsTrash} from "react-icons/bs";
import { map, forEach } from "lodash";
import { useParams, useNavigate} from "react-router-dom";
import { useOrder, useTable } from "../../../hooks";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import "./ListProductCart.css";

export function ListProductCart(props) {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(3));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;

    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }

    cleanProductCartApi();
    navigate(`/client/${tableNumber}/orders`);
  };

  return (
    <div className="row-div-cart">
      {map(products, (product, index) => (
        <div key={index} 
        className=""
        >
          <Card id="card-card" className="bg-dark text-white ">
            <img  id="card-img-cart" src={product.image} alt="Card image" />
            <Card.ImgOverlay >
              <Card.Title id="card-title-cart">{product.title}</Card.Title>
              <Card.Text id="card-price-cart" >1 x $ {product.price}</Card.Text>
              <Button id="card-button-cart" variant="light" name="close" onClick={() => removeProduct(index)}> 
                <IoMdClose/></Button>
            </Card.ImgOverlay>
          </Card>
          {/* <div className="row">
            <Image className="img-cart col-4 " src={product.image}  />
            <div className="col-5">
              <span className="span-title col-12 row">{product.title} </span>
              <span className="span-price col-12 row" >1 X ${product.price} </span>
              <br></br>
            </div>
            <Button className="col-3 btn-cart" name="close" onClick={() => removeProduct(index)}> 
                <IoMdClose></IoMdClose> Quitar</Button>
            
          </div> */}
          
        </div>
      ))}
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
