import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client";

export function Products() {
  const { idCategory,tableNumber } = useParams();
  const { loading, products, getProductsByCategory } = useProduct();
  console.log(products)
  useEffect(() => {getProductsByCategory(idCategory)}, [idCategory]);

  return (
    <div>
      <span>id de la mesa: {idCategory}</span>
      <Link to={`/client/${tableNumber}`}>Volver a categorias</Link>

      {loading ? <p>Cargando...</p> : <ListProducts products={products} />}
    </div>
  );
}