import React from "react";
import "./AddEditTableForm.css";
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import {useTable}from "../../../../hooks"


export function AddEditTableForm(props){
    const {onClose, onRefetch, table}=props;
    const { addTable } = useTable();
    console.log(table);

    const formik = useFormik({
        initialValues: initialValues(table),
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
            <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
                <Form.Group className="numMesa" controlId="numMesa">
                    <Form.Label>Numero de mesa</Form.Label>

                    <Form.Control 
                        type="number" 
                        name="number" 
                        placeholder="Ingrese un Numero de mesa"
                        value ={formik.values.number}
                        error={formik.errors.number} //error={formik.errors.email}
                        onChange={formik.handleChange}
                    />
                    <Form.Text className="text-muted">
                        Recuerda que no debes ingresar numeros decimales o ...
                    </Form.Text>
                </Form.Group>
                <Button className="btn-form" variant="" type="submit"  content={table ? "Actualizar" : "Crear"} >
                    Crear
                </Button>
                
            </Form>
        </div>
    );
}

function initialValues(data){
    return {
        number: data.number || "",
    };
}
function validationSchema(){
    return {
        number:Yup.number().required(true)
    }
}