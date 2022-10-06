import React, {useCallback, useEffect, useState} from 'react'
import {Form, Image, Button, Row, Col,Dropdown} from "react-bootstrap";
import { map } from 'lodash';
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik"
import * as Yup from "yup";
import { useCategory, useProduct } from "../../../../hooks";

export function AddEditProductForm() {
    const [categoriesFormat, setCategoriesFormat] = useState([]);
    const [previewImage, setPreviewImage] = useState(null)
  // HOOK DE CATEGORIAS========================
    const { categorias, getCategories } = useCategory();
    const { addProduct } = useProduct();

    console.log(categoriesFormat)
    
    useEffect(() => {getCategories()}, []);
    useEffect(() => {setCategoriesFormat(formatDropdownData(categorias))},[])

    const onDrop = useCallback( async (acceptedFile) => {
      const file = acceptedFile[0];
      await formik.setFieldValue('image', file);
      setPreviewImage(URL.createObjectURL(file))
    }, []);

    const formik = useFormik({ 
      initialValues: initialValues(),
      validationSchema: Yup.object(newSchema()),
      validationOnChange: false,
      onSubmit: async (formValue) => {
        await addProduct(formValue)
      }
    })

    const { getRootProps, getInputProps} = useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop,
    });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>

        <Col>
          <Form.Control 
            name="title" 
            placeholder="Nombre del producto"
            value={formik.values.title} 
            onChange={formik.handleChange}/>
        </Col>

        <Col>
          <Form.Control 
            name="price" 
            type="number" 
            placeholder="Precio"
            value={formik.values.price} 
            onChange={formik.handleChange}/>
        </Col>

      </Row>

      <br></br>

      <Row>

        <Col>
        <Form.Group controlId="formGridState" 
        value={formik.values.category} onChange={(_, ...data)=>console.log(...data)}
        >
          <Form.Select defaultValue="Categoria" option={categoriesFormat}>
            <option>{categoriesFormat}</option>

          </Form.Select>
        </Form.Group>
        </Col>

        <Col>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Producto activo"
          checked={formik.values.active} onChange={(_, ...data) => formik.setFieldValue('active', ...data.checked)}
        />
        </Col>

      </Row>

      <br></br>

      <Form.Group controlId="formFile" className="mb-3" fluid="true" {...getRootProps()}
      // color={formik.errors.image && red}
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
        <Form.Label>Imagen</Form.Label>
        <Form.Control type="file" {...getInputProps()} />
      </Form.Group>

      <Image src={previewImage}></Image>

      <br></br>
      
      <div className="d-grid gap-2"><Button variant="success" size="lg" type='submit'>Guardar</Button></div>
    </Form>
  )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        title: item.title,
        value: item.id,
    }))
}

function initialValues() {
  return {
    title: "",
    price: "",
    category: "",
    active: false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number(). required(true),
    active: Yup.boolean(). required(true),
    image: Yup.string().required(true)
  }
}