import React from "react";
import { Image } from "semantic-ui-react";
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
          <hr></hr>
          <div className="col-11 row div-categoria container-fluid mx-auto">
              <Image className="img-categoria col-6" src={category.image}/>
              <h6 className="text-center align-items-center col-6" >{category.title}</h6>
          </div>
        </div>
      ))}
    </div>
  );
}
