import React, { useState } from "react";
import { map } from "lodash";
import { Table, Button, Image } from 'react-bootstrap';
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineQrcode } from "react-icons/ai";
import {FaTrashAlt} from "react-icons/fa";
import QRCode from "qrcode.react";
import { ModalBasic } from "../../../Common";
import "./TableTablesAdmin.css";


export function TableTablesAdmin(props) {
  const { tables,updateTable, deleteTable } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showQr = (table) => {
    setContentModal(
      <div style={{ textAlign: "center" }}>
        <QRCode value={`${window.location.origin}/client/${table.number}`} />
      </div>
    );

    openCloseModal();
  };

  return (
    <>
       <Table className='table-tables-admin'>
        <thead>
          <tr>
            <th>Mesa Numero</th>
            
          </tr>
        </thead>
        <tbody>
          {map(tables, (table, index) => (
            <tr key={index}>
              <td>{table.number} </td>
              <Action table={table} updateTable={updateTable} deleteTable={deleteTable} showQr={showQr}/>
          </tr>
          ))}
        </tbody>
    </Table>

    <ModalBasic
    show={showModal}
    onClose={openCloseModal}
    title="Codigo QR"
    size="mini"
    children={contentModal}
    />
    </>
    );
}

function Action(props) {
  const {table, updateTable,deleteTable, showQr} = props;

  return (
    <td textalign="right" >
      <Button icon onClick={() => showQr(table)}>
        <AiOutlineQrcode> </AiOutlineQrcode>
      </Button>
      <Button variant='warning'  onClick={ () => updateTable(table)} >
      <FiEdit3 />
      </Button>
      <Button variant='danger' onClick={ () => deleteTable(table)}>  <FaTrashAlt/> </Button>

    </td>
  );
}
