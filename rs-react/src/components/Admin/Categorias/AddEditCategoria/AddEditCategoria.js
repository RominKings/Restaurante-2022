import React from 'react';
import { Form, Button, Image, Col, Row } from "react-bootstrap";

export function AddEditCategoria() {
  return (
    
    <Form 
    // onSubmit={formik.handleSubmit} 
    >
      <Row>
        <Col>
          <Form.Control name="title" placeholder="Nombre de la categoria" 
          // value={formik.values.username} onChange={formik.handleChange} error={formik.errors.username}
          />
        </Col>
        <Col>
          <Form.Control name="password" type="password" placeholder="Contraseña" 
          // value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password} 
          />
        </Col>
      </Row>
      
      <br></br>
      <Row>
        <Button type="button" fluid>
          Subir imagen
        </Button>
      </Row>
      <Button type="submit" >Crear</Button>
    </Form>
  )
}
