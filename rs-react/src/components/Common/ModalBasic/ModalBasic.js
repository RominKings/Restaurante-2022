import React from 'react'
import { Modal, Button } from "react-bootstrap";

export function ModalBasic(props) {
    const {children, title, show, onClose} = props;

  return (
    
      <Modal className=' container-fluid' show={show} onHide={onClose}>
        <Modal.Header className=' ' closeButton>
          {title && <Modal.Title className=''>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body className=' '>{children}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer> */}
      </Modal>
   
  )
}

