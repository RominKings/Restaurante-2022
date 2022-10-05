import React from "react";
import "./AddEditTableForm.css";
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Form } from 'react-bootstrap';
import {useTable}from "../../../../hooks"
export function AddEditTableForm(props){
    const {onClose, onRefetch, table}=props;
    const { addTable,updateTable } = useTable();

    const formik = useFormik({
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
            <Container>
            <Form id="formularioMesas" className='row login-form-admin' onSubmit={formik.handleSubmit}>

                    <Form.Label className="text-center">Numero de mesa</Form.Label>

                    <Form.Control 
                        id="numMesa"
                        className="input-formulario row mx-auto"
                        type="number" 
                        name="number" 
                        placeholder="Ingrese un Numero de mesa"
                        value ={formik.values.number}
                        error={formik.errors.number} //error={formik.errors.email}
                        onChange={formik.handleChange}
                        
                    ></Form.Control>
                
                <button 
                    
                    className="btn btn-primary btn-formulario mx-auto col-4 "
                    type="submit"
                   > Confirmar </button>
                
            </Form>
            </Container>
    );
}

function initialValues(data){
    return {
        number: ""
    };
}
function validationSchema(){
    return {
      number: Yup.number().required(true),
    };
  }
  