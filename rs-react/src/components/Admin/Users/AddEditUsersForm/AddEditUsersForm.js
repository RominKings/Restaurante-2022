import React from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useUser } from '../../../../hooks';

export function AddEditUsersForm(props) {
    const { onClose, onRefetch, user } = props;
    const { addUser, updateUser } = useUser();

    const formik = useFormik({
        initialValues: initialValues(), //(user),
        validatiOnSchema: Yup.object(user ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try{
                if (user) await updateUser(user.id, formValue)
                else await addUser(formValue);

                onRefetch();
                onClose();
            } catch(error) {
                console.error(error)
            }
        },
    })

  return (
    <Form onSubmit={formik.handleSubmit} >
      <Row>
        <Col>
          <Form.Control id="username" name="username" placeholder="Nombre de usuario" 
          value={formik.values.username} onChange={formik.handleChange} error={formik.errors.username}/>
        </Col>
        <Col>
          <Form.Control name="password" type="password" placeholder="Contraseña" 
          value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password} />
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Form.Control name="first_name" placeholder="Nombre" 
          value={formik.values.first_name} onChange={formik.handleChange} error={formik.errors.first_name}/>
        </Col>
        <Col>
          <Form.Control name="last_name" placeholder="Apellido" 
          value={formik.values.last_name} onChange={formik.handleChange} error={formik.errors.last_name}/>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Form.Control name="email" type='email' placeholder="Email" 
          value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email}/>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
        <Form.Check 
        type="switch"
        id="is_active"
        label="Usuario Activo"
        checked={formik.values.is_active}
        onChange={( data) => formik.setFieldValue("is_active", data.checked)} //NO FUNCIONA
      />
        </Col>
        <Col>
        <Form.Check 
        type="switch"
        id="is_staff"
        label="Usuario Administrador"
        checked={formik.values.is_staff}
        onChange={( data) => formik.setFieldValue("is_staff", data.checked)} // NO FUNCIONA
      />
        </Col>
      </Row>
      <Button type="submit" fluid content={user ? "Actualizar" : "Crear"}>Todo listo</Button>
    </Form>
  )
}

function initialValues(data) {
    return{
        username: "", //data?.username || "" ,
        email:"", //data?.email || "",
        first_name: "", //data?.first_name || "",
        last_name: "", //data?.last_name || "",
        is_active: true,
        is_staff: false,
        password: "",

    };
};

function newSchema() {
    return{
        username: Yup.string().required(true) ,
        email: Yup.string().email(true).required(true) ,
        first_name: Yup.string(),
        last_name: Yup.string(),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
        password: Yup.string().required(true),

    }
}

function updateSchema() {
  return{
    username: Yup.string().required(true) ,
    email: Yup.string().email(true).required(true) ,
    first_name: Yup.string(),
    last_name: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
    password: Yup.string(),

  }
}