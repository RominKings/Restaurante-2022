import React from 'react'
import { Modal, Button } from "react-bootstrap";

export function ModalBasic(props) {
    const {children, title, show, onClose} = props;

  return (
    
      <Modal className='row container-fluid' show={show} onHide={onClose}>
        <Modal.Header className=' row' closeButton>
          {title && <Modal.Title className='row'>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body className='row '>{children}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer> */}
      </Modal>
   
  )
}

