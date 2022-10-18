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
  };

  return (
    <div className="">
      
      {map(products, (product) => (
        <div key={product.id} className="row col-11 mx-auto">
          <hr></hr>
          <div className="">
            <Image className="col-4" src={product.image} />
            <h6 className="co-6 text-center " >{product.title}</h6>
          </div>
          <Button className="btn-lis-product row col-3 mx-auto" onClick={() => addCart(product)}>
            <BsCartPlus></BsCartPlus>
          </Button>
        </div>
      ))}
    </div>
  );
}
