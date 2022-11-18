import React from 'react'
import { Table, Button, Image } from 'react-bootstrap';
import { map } from "lodash";
import {FcCheckmark, FcCancel} from 'react-icons/fc';
import { FiEdit3 } from "react-icons/fi";
import {FaTrashAlt} from "react-icons/fa";
import "./TableProductAdmin.css"

export function TableProductAdmin(props) {
  const { products, updateProduct, deleteProduct } = props;
  console.log(products)

  return (
    <Table striped bordered hover className='tabla-product-admin'>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Activo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {map(products, (product, index) => (
          <tr key={index}>
            <td width={2}>
              <Image src={product.image} bsPrefix rounded fluid /></td>
            <td>{product.title}</td>
            <td> $ {product.price}</td>
            <td>{product.category_data.title}</td>  
            <td>{product.active ? <FcCheckmark/> : <FcCancel/>} </td>
            <Actions product={product} updateProduct={updateProduct} deleteProduct={deleteProduct}/>
        </tr>
        ))}
      </tbody>
    </Table>
  )
}

function Actions(props) {
  const {product, updateProduct, deleteProduct} = props;

  return (
    <td textalign="right" >
      <Button variant='warning' onClick={ () => updateProduct(product)}><FiEdit3 /></Button>
      <Button variant='danger' onClick={ () => deleteProduct(product)}>  <FaTrashAlt/> </Button>
    </td>
  )
}


