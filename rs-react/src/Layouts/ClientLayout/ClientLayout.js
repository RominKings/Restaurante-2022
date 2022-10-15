import React, {useEffect}from 'react';
import "./ClientLayaut.css";
import {useParams, useNavigate, Link  } from "react-router-dom";
import {useTable } from '../../hooks';

import {BsCart4, } from "react-icons/bs";
import {BiLogOut,} from "react-icons/bi";
import {RiListCheck } from "react-icons/ri";

import {Button} from "react-bootstrap"

export function ClientLayout(props) {
  const {children} =props;
  const { isExistTable } = useTable();
  const { tableNumber } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const exist = await isExistTable(tableNumber);
      if (!exist) closeTable();
    })();
  }, [tableNumber]);

  const closeTable = () => {
    navigate("/");
  };
  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`);
  };
  const goToOrders = () => {
    navigate(`/client/${tableNumber}/orders`);
  };
  return (
    <div>
      <div className=''>
        <Link className='link-inicio row' to={`/client/${tableNumber}` }>
          <h1>Inicio</h1>
        </Link>
        <h6 className=' text-center' >Mesa {tableNumber} </h6>
        <div className='btn-group col-12 ' role="group" aria-label="Basic outlined example">
          <button className='btn btn-outline-primary btns-ini' onClick={goToCart}>
            <BsCart4></BsCart4>
          </button>
          <button className=' btn btn-outline-primary btns-ini' onClick={goToCart}>
            <RiListCheck></RiListCheck>
          </button>
          <button className=' btn btn-outline-primary btns-ini' onClick={closeTable}>
            <BiLogOut></BiLogOut>
          </button>
        </div>
      </div>
        {children}
      </div>
  );
}


