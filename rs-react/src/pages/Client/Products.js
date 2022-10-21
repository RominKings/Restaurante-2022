import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {GrPrevious} from "react-icons/gr";
import { Spinner } from "react-bootstrap";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client";
import "./Products.css";

export function Products() {
  const { idCategory,tableNumber } = useParams();
  const { loading, products, getProductsByCategory } = useProduct();
  console.log(products)
  useEffect(() => {getProductsByCategory(idCategory)}, [idCategory]);

  return (
    <>
    <div>
      {/* <span>{idCategory}</span> */}
      <Link to={`/client/${tableNumber}`}><GrPrevious/><GrPrevious/></Link>

    </div>
    <div className="row-products">
      {loading ? <Spinner animation="border" variant="dark" /> : <ListProducts products={products} />}
    </div>
      </>
);

}