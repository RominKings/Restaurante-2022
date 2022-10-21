import React from "react";
import { Card } from "react-bootstrap"
import { map } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import "./ListCategories.css";

export function ListCategories(props) {
  const { categories } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const goToCategory = (id) => {
    navigate(`${location.pathname}/${id}`);
  };

  return (
    <div className="row">
      {map(categories, (category) => (
        <div
          key={category.id}
          className="row categorias"
          onClick={() => goToCategory(category.id)}
          >
          <Card bsPrefix='card-categoria' className="col-11" >
            <Card.Img bsPrefix='card-image-categoria'src={category.image} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title bsPrefix='card-title-categoria'>{category.title}</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </div>
      ))}
    </div>
  );
}