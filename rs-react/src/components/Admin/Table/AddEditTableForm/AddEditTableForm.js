import React from "react";
import "./AddEditTableForm.css";
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { initial } from "lodash";
import {useTable}from "../../../../hooks"
export function AddEditTableForm(props){

    const {onClose,onRefetch}=props;
    const {addTable}=useTable()

    const formik=useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange:false,
        onSubmit:async (formValue)=>{
            await addTable(formValue);

            onRefetch();
            onClose();
        },
    })
        
    return (
        <div>
            
            <h1>Agregar mesa</h1>
            <hr/>
            <Form className='login-form-admin' onSubmit={formik.handleSubmit} method="post" >
                <Form.Group className="numMesa" controlId="numMesa">
                    <Form.Label>Numero de mesa</Form.Label>

                    <Form.Control 
                        type="number" 
                        name="number"
                        placeholder="Ingrese un Numero de mesa"
                        error={formik.errors.number} //error={formik.errors.email}
                        onChange={formik.handleChange}
                    />
                    <Form.Text className="text-muted">
                        Recuerda que no debes ingresar numeros decimales o ...
                    </Form.Text>
                </Form.Group>
                <button className="btn-form" variant="" type="submit" >
                    Crear
                </button>
                
            </Form>
        </div>
    );
}

function initialValues(){
    return {
        number:""
    }
}
function validationSchema(){
    return {
        number:Yup.number().required(true)
    }
}