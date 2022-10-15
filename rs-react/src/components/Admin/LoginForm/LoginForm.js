import React from 'react';
import "./LoginForm.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { loginApi } from '../../../api/user';
import { useAuth } from '../../../hooks/useAuth';
import { Button, Form } from 'react-bootstrap';


export function LoginForm() {
  const { login } = useAuth();

//PARA QUE NO SE ENVIE UN FORMULARIO EN BLANCO, APAREZCA UN ERROR Y REGISTRE LOS FORMULARIOS-----------------------
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange:false,
        onSubmit: async (formValue) => {
          try {
            const response = await loginApi(formValue)
            const { access } = response;
            login(access)
          } catch (error) {
            toast.error(error.message)
          }
        }
    });
//FORMULARIO LOGIN HECHO CON BOOTSTRAP-------------------------------------------
  return (
    <Form noValidate className='login-form-admin' onSubmit={formik.handleSubmit} >
        <Form.Group className="email" controlId="email">
          <Form.Label>Dirección de correo electrónico</Form.Label>
          <Form.Control 
            required
            type="email" 
            placeholder="Ingresa tu email"
            value={formik.values.email} 
            isValid={formik.touched.email}
            isInvalid={!!formik.errors.email}
            onChange={formik.handleChange} 
            
          />
          <Form.Control.Feedback
          >
             
          </Form.Control.Feedback>
          
          <Form.Control.Feedback 
              className="txtError"
              type="invalid">
              {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="password" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Contraseña" 
            value={formik.values.password} 
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.password}
           
          />
          <Form.Control.Feedback 
              className="txtError"
              type="invalid">
              {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <hr/>
        <div className='row'>
        <Button variant="dark" type="submit" >
          Enviar
        </Button>
        </div>
    </Form>
  );
}

//PARTE DE LA FUNCION DE ARRIBA, PARA QUE QUEDE MAS ORDENADO--------------------------
function initialValues(){
    return {
        email:"",
        password: "",
    }
}

function validationSchema(){
    return{
        email: Yup.string().email("Debe ingresar un email valido").required("Debe ingresar un email"),
        password: Yup.string().required("Debe ingresar una contraseña valida")
    };
}