import React from 'react'
import { map } from 'lodash';
import { Table, Button, Image } from 'react-bootstrap';
import "./TablaCategoriasForm.css";
import { FiEdit3 } from "react-icons/fi";
import {FaTrashAlt} from "react-icons/fa";


export function TablaCategoriasAdmin(props) {
  const { categories , updateCategory, deleteCategory  } = props;
  return (
    <Table striped bordered hover className='tabla-categoria-admin'>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {map(categories, (categoria, index) => (
          <tr key={index}>
            <td width={2}>
              <Image src={categoria.image} bsPrefix rounded fluid /></td>
            <td>{categoria.title} </td>
            <Action 
            categoria={categoria}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
              />
        </tr>
        ))}
      </tbody>
    </Table>
  )
}

function Action(props) {
  const {categoria, updateCategory, deleteCategory } = props;

  return (
    <td textalign="right" >
      <Button variant='warning'  onClick={ () => updateCategory(categoria)} >
        <FiEdit3 />
      </Button>
      <Button variant='danger' onClick={ () => deleteCategory(categoria)}>  <FaTrashAlt/> </Button>

    </td>
  )
}
