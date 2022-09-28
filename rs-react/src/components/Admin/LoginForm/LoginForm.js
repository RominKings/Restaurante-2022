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
    <Form className='login-form-admin col-8' onSubmit={formik.handleSubmit} >
        <Form.Group className="email" controlId="email">
        <Form.Label>Dirección de correo electrónico</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Ingresa tu email"
          value={formik.values.email} 
          onChange={formik.handleChange} 
          error="true" //error={formik.errors.email}
        />
        <Form.Text className="text-muted">
        Nunca compartiremos tu correo electrónico con nadie más.
        </Form.Text>
      </Form.Group>

      <Form.Group className="password" controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Contraseña" 
          value={formik.values.password} 
          onChange={formik.handleChange}
          error="true" 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Échame un vistazo" />
      </Form.Group>
      <Button variant="dark" type="submit">
        Enviar
      </Button>
    </Form>
  );
}

//PARTE DE LA FUNCION DE ARRIBA, PARA QUE QUEDE MAS ORDENADO--------------------------
function initialValues(){
    return {
        email: "",
        password: "",
    }
}

function validationSchema(){
    return{
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
}