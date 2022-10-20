import React, { useEffect } from "react";
import { useCategory } from "../../hooks";
import { ListCategories } from "../../components/Client";
import {Spinner} from "react-bootstrap";
import "./categories.css";


export function Categories() {
  const { loading, categories, getCategories } = useCategory();
  useEffect(() => {getCategories()}, []);


  return (
    <div className="text-title-categories">
      <h3>Categorías</h3>
      {loading ? <Spinner animation="border" variant="dark" /> : <ListCategories categories={categories} />}
    </div>
  );
}