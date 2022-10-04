import React, { useState } from "react";
import { map } from "lodash";
import { Table, Button, Image } from 'react-bootstrap';
import { FiEdit3 } from "react-icons/fi";
import {FaTrashAlt} from "react-icons/fa";
//import QRCode from "qrcode.react";
//import { ModalBasic } from "../../../Common";
import "./TableTablesAdmin.css";


export function TableTablesAdmin(props) {
  const { tables,updateTable, deleteTable } = props;

  return (
       <Table striped bordered hover className='table-tables-admin'>
      <thead>
        <tr>
          <th textAlign="center">Mesa Numero</th>
        </tr>
      </thead>
      <tbody>
        {map(tables, (table, index) => (
          <tr textalign="center" key={index}>
            <td  >{table.number} </td>
            <Action table={table} updateTable={updateTable} />
        </tr>
        ))}
      </tbody>
    </Table>
  );
}

function Action(props) {
  const {table,updateTable} = props;

  return (
    <td textAlign="right" >
      <Button variant='warning'  onClick={ () => updateTable(table)} >
        <FiEdit3 />
      </Button>
      <Button variant='danger' onClick={ () => console.log('Eliminar categoria')}>  <FaTrashAlt/> </Button>

    </td>
  );
}
