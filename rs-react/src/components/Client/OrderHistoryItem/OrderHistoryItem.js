import React from "react";
import { Card, Spinner, Image } from "react-bootstrap";
import {FcApproval} from "react-icons/fc"
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constants";
import "./OrderHistoryItem.css";

export function OrderHistoryItem(props) {
  const { order } = props;
  console.log(order.product_data)
  const { title, image } = order.product_data;

  return (
    <div
      className={classNames("", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="row-div-history">
          <Card id="card-history" className="bg-dark text-white col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2">
            <Card.Img  id="card-img-history" src={image} alt="Card image" />
            <Card.ImgOverlay >
              <Card.Title id="card-title-history">{title}</Card.Title>
              <Card.Text id="card-span-history" >
                <span className="span-pedido-time">
                    Pedido {moment(order.created_at).startOf("second").fromNow()}
                </span>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
          
      {/* <div className="">
        <span>
        Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>

      <div className="">
        <Image src={image} />
        <p>{title}</p>
      </div> */}

      {order.status === ORDER_STATUS.PENDING ? (
        <span>En marcha <Spinner animation="grow" variant="light" size="sm" /> <Spinner animation="grow" variant="secondary" size="sm" /> <Spinner animation="grow" size="sm" /></span>
      ):(
        <span>Entregado <FcApproval/></span>
      )}
      </div>
    </div>
  );
}
