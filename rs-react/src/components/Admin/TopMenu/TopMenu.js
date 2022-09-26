import React from "react";
import { useAuth } from "../../../hooks";
import "./TopMenu.css";
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
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
    <><Navbar bg="light" expand="lg" className="navbar" pathname={pathname}>
      <Container>
        <Navbar.Brand href="#home"> <MdWork/> Hola, {renderName()} </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
{/**--------AL PRESIONAR PADIDOS QUEDA MARCADO PORQUE ESTAMOS EN LA PAGINA CORRESPONDIENTE----------------*/}
            <Nav.Link href="/admin" active={pathname === "/admin"}> <HiOutlineStar/> Pedidos  </Nav.Link>
            <Nav.Link href="/admin/tables" active={pathname === "/admin/tables"}> <GiTable/> Mesas  </Nav.Link>
            <Nav.Link href="/admin/history" active={pathname === "/admin/history"}> <BiBookBookmark/> Historico  </Nav.Link>
            <Nav.Link href="/admin/categories" active={pathname === "/admin/categories"}> <BiCategoryAlt/> Categorias  </Nav.Link>
            <Nav.Link href="/admin/products" active={pathname === "/admin/products"}> <GiShoppingCart/> Productos </Nav.Link>
{/**--------NO TODOS LOS USUARIOS PUEDEN VER ESTA SECCION, CON ESTO SOLO EL STAFF O EL SUPERUSUARIO PUEDE VERLO----------------*/}
            {auth.me.is_staff && (
            <Nav.Link href="/admin/users" active={pathname === "/admin/users"}> <HiOutlineUserGroup/> Usuarios  </Nav.Link>)}
          </Nav>
          <Button variant="danger" size="sm" onClick={logout}>
            <AiOutlinePoweroff/>
          </Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="contenedor">
    <Container>{children}</Container>
    </div></>
  );
}


