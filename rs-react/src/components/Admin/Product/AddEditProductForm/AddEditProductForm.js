import React, {useEffect, useState} from 'react'
import {Form, Image, Button, Row, Col, Dropdown, DropdownButton} from "react-bootstrap";
import { map } from 'lodash';
import { useCategorias } from "../../../../hooks";

export function AddEditProductForm() {
    const [categoriesFormat, setcategoriesFormat] = useState([]);
    const { categorias, getCategorias } = useCategorias();
    
    useEffect(() => {getCategorias()}, []);
    useEffect(() => {setcategoriesFormat(formatDropdownData(categorias))},[])

  return (
    <Form>
      <Row>
        <Col>
          <Form.Control name="title" placeholder="Nombre del producto"/>
        </Col>
        <Col>
          <Form.Control name="price" type="number" placeholder="Precio"/>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
        <DropdownButton id="dropdown-basic-button" title="Categorias">
            <Dropdown.Item href="#/action-1">{categoriesFormat}</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
        {/* <Form.Group as={Col} controlId="formGridState" >
          <Form.Select defaultValue="Categoria" option={categoriesFormat }>
            <option>Categoria</option>
          </Form.Select>
        </Form.Group> */}
        </Col>
        <Col>
        <Form.Check 
        type="switch"
        id="custom-switch"
        label="Producto activo"/>
        </Col>
      </Row>
      <br></br>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Imagen</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <br></br>
      <div className="d-grid gap-2"><Button variant="success" size="lg">Guardar</Button></div>
    </Form>
  )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        title: item.title,
        value: item.id,
    }))
}
