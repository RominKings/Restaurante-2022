import React from "react";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import { ORDER_STATUS } from "../../../utils/constants";
import "./OrderHistoryItem.css";

export function OrderHistoryItem(props) {
  const { order } = props;
  const { title, image } = order.product_data;

  return (
    <div
      className={classNames("", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="">
        <span>
          
        </span>
      </div>

      <div className="">
        <Image src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING ? (
        <span>En marcha</span>
      ):(
        <span>Entregado</span>
      )}
    </div>
  );
}
