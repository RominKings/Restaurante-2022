import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./ModalConfirm.css";

export function ModalConfirm(props) {
  const { title, show, onClose, onCloseText, onConfirm, onConfirmText } = props;

  return (
    <Modal className="modal-confirm" show={show} onHide={onClose} >
       <Modal.Header>
       {title &&
        <Modal.Title> {title}</Modal.Title> }
       </Modal.Header>

      <Modal.Body>
        <Button  onClick={onClose}>
          {onCloseText || "Cancelar"}
        </Button>
        <Button  onClick={onConfirm}>
          {onConfirmText || "Aceptar"}
        </Button>
      </Modal.Body>
    </Modal>
  );
}
