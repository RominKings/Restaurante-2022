import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client";
import "./Client.css";
export function Cart() {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();

      const productsArray = [];
      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div className="set-container">
      <Link to={`/client/${tableNumber}`}>Volver a categorias</Link>
      <h1>Carrito</h1>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Tu carrito esta vacio</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button>Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
      <span className="fixed-bottom">@</span>
    </div>
  );
}
