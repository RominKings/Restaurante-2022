import React, {useState} from "react";
import { Image, Button, Card} from "react-bootstrap";
import {BsCartPlus} from "react-icons/bs"
import { map } from "lodash";
import { toast } from "react-toastify";
import { addProductCart } from "../../../api/cart";
import "./ListProducts.css";

export function ListProducts(props) {
  const { products } = props;
  const [quantity, setQuantity] = useState(1)

  const addCart = (product) => {
    addProductCart(product.id);
    toast.success(`${product.title} añadido al carrito`);

    console.log(products)
  };

  const handleDecrement = () => {
    if(quantity > 1){
      setQuantity(prevCount => prevCount -1);
    }
  }

  const handleIncrment = () => {
    if(quantity > 1){
      setQuantity(prevCount => prevCount +1);
    }
  }

  return (
    <div className="">
      
      {map(products, (product) => (
        <div key={product.id} className="rowww col-11 mx-auto col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2">
          <Card style={{ width: '18rem'}} >
            <Card.Img  bsPrefix='card-image-listproduct' src={product.image} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              {/* <Card.Text>**Descripcion del producto**</Card.Text> */}
              <Card.Text>Precio: ${product.price}</Card.Text>
              <div className="d-grid gap-2">
              <Button variant="success" size="sm" onClick={handleDecrement} >Restar <BsCartPlus/></Button>
              <div>{quantity}</div>
              <Button variant="success" size="sm" onClick={handleIncrment} >Sumar <BsCartPlus/></Button>
                <Button variant="success" size="sm" onClick={() => addCart(product)} >Agregar {addCart}<BsCartPlus/> </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}