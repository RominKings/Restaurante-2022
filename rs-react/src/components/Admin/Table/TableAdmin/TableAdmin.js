import React from 'react'
import { ReactComponent as IcTable } from "../../../../assets/mesa.svg";
import { Button } from 'react-bootstrap';
import "./TableAdmin.css";

export function TableAdmin(props) {
  const {table} = props;

  return (
    <div className='table-admin'>
      <h1><IcTable id="mesa" /></h1>
      <p>Mesa {table.number}</p>
    </div>
  )
}
