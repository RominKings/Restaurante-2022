import React, { useState } from "react";
import { map } from "lodash";
import { Table, Button, Image } from 'react-bootstrap';
import { FiEdit3 } from "react-icons/fi";
import {FaTrashAlt} from "react-icons/fa";
//import QRCode from "qrcode.react";
//import { ModalBasic } from "../../../Common";
import "./TableTablesAdmin.css";


export function TableTablesAdmin(props) {
  const { tables, updateTable, deleteTable } = props;

  return (
       <Table striped bordered hover className='table-tables-admin'>
      <thead>
        <tr>
          <th>Mesa Numero</th>
        </tr>
      </thead>
      <tbody>
        {map(tables, (table, index) => (
          <tr key={index}>
            <td>{table.number} </td>
            <Action table={table}/>
        </tr>
        ))}
      </tbody>
    </Table>
  );
}

function Action(props) {
  const {table} = props;

  return (
    <td textAlign="right" >
      <Button variant='warning'  onClick={ () => console.log("Editar mesa")} >
        <FiEdit3 />
      </Button>
      <Button variant='danger' onClick={ () => console.log('Eliminar categoria')}>  <FaTrashAlt/> </Button>

    </td>
  );
}
