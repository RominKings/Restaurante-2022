import React from 'react'
import { map } from 'lodash';
import { Table, Button, Image } from 'react-bootstrap';
import "./TablaCategoriaAdmin.css";
import { FiEdit3 } from "react-icons/fi";
import {FaTrashAlt} from "react-icons/fa";
import { useAuth } from '../../../../hooks';


export function TablaCategoriasAdmin(props) {
  const { categories } = props;

  return (
    <Table striped bordered hover className='tabla-categoria-admin'>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {map(categories, (categoria, index) => (
          <tr key={index}>
            <td width={2}>
              <Image src={categoria.image} bsPrefix rounded fluid /></td>
            <td>{categoria.title} </td>
            <Action categoria={categoria}/>
        </tr>
        ))}
      </tbody>
    </Table>
  )
}

function Action(props) {
  const {categoria} = props;

  return (
    <td textalign="right" >
      <Button variant='warning'  onClick={ () => console.log("Actulizar categoria")} >
        <FiEdit3 />
      </Button>
      <Button variant='danger' onClick={ () => console.log('Eliminar categoria')}>  <FaTrashAlt/> </Button>

    </td>
  )
}
