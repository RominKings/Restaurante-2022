import React from "react";
import { useAuth } from "../../../hooks";
import "./TopMenu.css";
import { Button, Nav, Navbar, Container, Offcanvas } from 'react-bootstrap';
import { useLocation} from "react-router-dom";
import {AiOutlinePoweroff} from "react-icons/ai";
import {GiShoppingCart, GiTable} from "react-icons/gi"; 
import {BiBookBookmark, BiCategoryAlt} from "react-icons/bi";
import {HiOutlineUserGroup, HiOutlineStar} from "react-icons/hi";
import {MdWork} from "react-icons/md";

export function TopMenu(props) {
  const { auth, logout } = useAuth(); //MD - TP
  const { children } = props; //SD
  const { pathname } = useLocation(); //SACO LOS PATH DE LAS PAGINAS
  console.log(auth);


//PARA QUE SALGA EL NOMBRE O EL EMAIL DEL USUARIO EN EL NAV
  const renderName = () => {
    if (auth.me.first_name && auth.me.last_name) {
      return `${auth.me.first_name} ${auth.me.last_name}`;
    }
    return auth.me.email;
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="ligth" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#home" className="color-dark"> <MdWork/> Hola, {renderName()} </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Restaurante Siglo XXI
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/**--------AL PRESIONAR PADIDOS QUEDA MARCADO PORQUE ESTAMOS EN LA PAGINA CORRESPONDIENTE----------------*/}
                  <Nav.Link href="/admin" active={pathname === "/admin"}> <HiOutlineStar/> Pedidos  </Nav.Link>
                  <Nav.Link href="/admin/tables" active={pathname === "/admin/tables"}> <GiTable/> Mesas  </Nav.Link>
                  <Nav.Link href="/admin/history" active={pathname === "/admin/history"}> <BiBookBookmark/> Historico  </Nav.Link>
                  <Nav.Link href="/admin/categories" active={pathname === "/admin/categories"}> <BiCategoryAlt/> Categorias  </Nav.Link>
                  <Nav.Link href="/admin/products" active={pathname === "/admin/products"}> <GiShoppingCart/> Productos </Nav.Link>
                  {auth.me.is_staff && (<Nav.Link href="/admin/users" active={pathname === "/admin/users"}> <HiOutlineUserGroup/> Usuarios  </Nav.Link>)}
                </Nav>
                  <Button variant="danger" size="sm" onClick={logout}><AiOutlinePoweroff/></Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar> 
      ))}

    <div className="contenedor">
    <Container>{children}</Container>
    </div></>
  );
}


