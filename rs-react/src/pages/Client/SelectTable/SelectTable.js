import React, {useState} from 'react';
import { Form, Button } from "react-bootstrap";
import "./SelectTable.css"

export  function SelectTable() {
  const [tableNum, setTableNum] = useState(null)
  const [error, setError] = useState(null)

  const onSubmit = () => {
    setError(null)
    if(!tableNum) {
      setError("No has introducido ninguna mesa")
    } else {
      console.log("Entrando...")
    }
  }

  return (
    <div className='client-content'>
      <div className='select-table'>
        <h1>Bienvenidos a Restaurante Siglo XXI</h1>

          <Form onSubmit={onSubmit}>
            <Form.Group className="email" controlId="email">
              <Form.Label>Ingresa numero de mesa</Form.Label>
                <Form.Control 
                  type="number"
                  className='tableNum'
                  placeholder="Por ejemplo: 99, 55, 45"
                  onChange={ data => { console.log("data.target.value", data.target.value);
                setTableNum(data.target.value);}}
                />
            </Form.Group>
            <br></br>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">Entrar</Button>
          </div>
          <p>{error}</p>
          </Form>
          
          
      </div>
    </div>
  )
}