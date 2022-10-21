import React from "react";
import { Image, Button} from "react-bootstrap";
import {BsCartPlus} from "react-icons/bs"
import { map } from "lodash";
import { toast } from "react-toastify";
import { addProductCart } from "../../../api/cart";
import "./ListProducts.css";

export function ListProducts(props) {
  const { products } = props;

  const addCart = (product) => {
    addProductCart(product.id);
    toast.success(`${product.title} añadido al carrito`);

    console.log(products)
  };

  return (
    <div className="">
      
      {map(products, (product) => (
        <div key={product.id} className="row col-11 mx-auto">
          <hr></hr>
          <div className="row">
          
            <Image className="col-4" src={product.image} />
         
            <div className="col-5">
              <h6 className=" row col-12 ">{product.title}</h6>
              <h6 className=" row col-12">Precio: ${product.price}</h6>
            </div>
            <Button className="btn-lis-product col-3 mx-auto" onClick={() => addCart(product)}>
            <BsCartPlus></BsCartPlus>
            Agregar
          </Button>
          </div>
          
        </div>
      ))}
    </div>
  );
}
