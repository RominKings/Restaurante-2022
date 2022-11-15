import React,{useState} from "react";
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
            <Form noValidate   id="formularioMesas" className=' login-form-admin' onSubmit={formik.handleSubmit}>

                    <Form.Label className="text-center">Numero de mesa</Form.Label>

                    <Form.Control 
                        required
                        id="numMesa"
                        className="input-formulario mx-auto"
                        type="number" 
                        name="number" 
                        placeholder="Ingrese un Numero de mesa"
                        value ={formik.values.number}
                       
                        isValid={formik.touched.number } //error={formik.errors.email}
                        isInvalid={!!formik.errors.number}
                        onChange={formik.handleChange}
                        
                    ></Form.Control>
                
                    <Form.Control.Feedback 
                        className="txtError"
                        type="invalid">
                        {formik.errors.number}
                    </Form.Control.Feedback>
                    <br></br>
                    <button 
                        className="btn btn-primary  btn-formulario mx-auto col-4 "
                        type="submit"
                    > 
                        Confirmar 
                    </button>
                
            </Form>
            </Container>
    );
}

function initialValues(data){
    return {
        number: data ? data.number : "",
    };
}
function validationSchema(){
    return {
      number: Yup.number("Debe ingresar un numero").required("Este campo no debe estar vacio..."),
    };
  }
  