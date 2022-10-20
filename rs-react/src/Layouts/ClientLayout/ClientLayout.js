import React, {useEffect}from 'react';
import "./ClientLayaut.css";
import {useParams, useNavigate, Link  } from "react-router-dom";
import {useTable } from '../../hooks';

import {BsCart4, } from "react-icons/bs";
import {BiLogOut, BiHome} from "react-icons/bi";
import {RiListCheck } from "react-icons/ri";

import {Container, Nav, Navbar} from "react-bootstrap"

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

  const goToMenu = () => {
    navigate(`/client/${tableNumber}`);
  }

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
    <div className='set-client'>
      <div role="group" aria-label="Basic outlined example">

      <Navbar bsPrefix='navbar' variant="light">
        <Container>
          <Navbar.Brand href="#home">Estás en la mesa N°{tableNumber}</Navbar.Brand>
          <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link onClick={goToMenu}><BiHome/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={goToCart}><BsCart4/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link  onClick={goToOrders}><RiListCheck/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={closeTable}><BiLogOut/></Nav.Link>
              </Nav.Item>
            </Nav>
        </Container>
      </Navbar>
      </div>
        {children}
      </div>
  );
}


