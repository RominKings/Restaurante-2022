import React from "react";
import "./AddEditTableForm.css";
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import {useTable}from "../../../../hooks"

export function AddEditTableForm(props){

    const {onClose,onRefetch,table}=props;
    const {addTable,updateTable}=useTable()

    const formik=useFormik({
        initialValues: initialValues(table),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange:false,
        onSubmit:async (formValue)=>{
            if (table) await updateTable(table.id,formValue);
            else await addTable(formValue);

            onRefetch();
            onClose();
        },
    });
    console.log(table)
    return (
        <div>
            
            <h1>Agregar mesa</h1>
            <hr/>
            <Form className='' onSubmit={formik.handleSubmit} method="post" >
                <Form.Group className="numMesa" controlId="numMesa">
                    <Form.Label>Numero de mesa</Form.Label>

                    <Form.Control 
                        type="number" 
                        name="number"
                        placeholder="Ingrese un Numero de mesa"
                        error={formik.errors.number} 
                        onChange={formik.handleChange}
                        value={formik.values.number}
                    />
                </Form.Group>
                <Button className="btn-form" variant="" type="submit" content={table ? "Actualizar":"Crear" }>
                </Button>
                
            </Form>
        </div>
    );
}

function initialValues(data) {
    return {
        number: data?.number || "",
    };
  }
  
  function validationSchema() {
    return {
      number: Yup.number().required(true),
    };
  }
  