import React from 'react'
import { Modal, Button } from "react-bootstrap";

export function ModalBasic(props) {
    const {children, title, show, onClose} = props;

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

