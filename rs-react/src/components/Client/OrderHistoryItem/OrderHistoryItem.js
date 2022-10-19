import React from "react";
import { Image } from "react-bootstrap";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
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
        Pedido {moment(order.created_at).startOf("second").fromNow()}
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
