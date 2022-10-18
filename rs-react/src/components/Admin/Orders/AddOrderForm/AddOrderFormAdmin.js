import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./AddOrderFormAdmin.css";

export function AddOrderFormAdmin(props) {
    const {idTable, OpenCloseModal} =props;
  return (
    <Form>
        <Form.Select placeholder='Productos' fluid selection search>
            <option>Large select</option>

            <div className='add-order-form'></div>
        </Form.Select>

        <Button type='submit' variant='primary'>Añadir productos a la mesa</Button>

    </Form>
  )
}
