import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./ModalConfirm.css";

export function ModalConfirm(props) {
  const { title, show, onClose, onCloseCash, onCloseCard, txtbtnCash, txtbtnCard} = props;

  return (
    <Modal className="modal-confirm" show={show} onHide={onClose}>
       <Modal.Header closeButton>
       {title &&
        <Modal.Title> {title}</Modal.Title> }
       </Modal.Header>

      <Modal.Body>
        <Button  onClick={onCloseCash}>
          {txtbtnCash || "Cancelar"}
        </Button>
        <Button  onClick={onCloseCard}>
          {txtbtnCard || "Aceptar"}
        </Button>
      </Modal.Body>
    </Modal>
  );
}
