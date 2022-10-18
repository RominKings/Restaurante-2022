import React, {useCallback, useEffect, useState} from 'react'
import {Form, Image, Button, Row, Col,Dropdown} from "react-bootstrap";
import { map } from 'lodash';
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik"
import * as Yup from "yup";
import { useCategory, useProduct } from "../../../../hooks";

export function AddEditProductForm(props) {
    const { product, onClose, onRefetch } = props;
    const [categoriesFormat, setCategoriesFormat] = useState([]);
    const [previewImage, setPreviewImage] = useState(product ? product.image : null)

    const { categories, getCategories } = useCategory();
    const { addProduct, updateProduct } = useProduct();

    console.log(categoriesFormat)
    
    useEffect(() => {getCategories()}, []);
    console.log(categories)
    useEffect(() => {setCategoriesFormat(formatDropdownData(categories));}, [categories]);

    const onDrop = useCallback( async (acceptedFile) => {
      const file = acceptedFile[0];
      await formik.setFieldValue('image', file);
      setPreviewImage(URL.createObjectURL(file))
    }, []);

    const formik = useFormik({ 
      initialValues: initialValues(product),
      validationSchema: Yup.object(newSchema(product ? updateSchema() : newSchema())),
      validationOnChange: false,
      onSubmit: async (formValue) => {
        if(product) await updateProduct(product.id, formValue)
        else await addProduct(formValue);

        onRefetch();
        onClose();
      }
    })

   const { getRootProps, getInputProps } = useDropzone({
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
        
        {/* <Dropdown value={formik.values.category} onChange={(_, ...data)=>console.log(...data)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Categorias
          </Dropdown.Toggle >

          <Dropdown.Menu onSelect={categoriesFormat}>
            <Dropdown.Item></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        {/* <Form.Group name="" controlId="category" 
        value={formik.values.category} onChange={(_, ...data)=>console.log(...data)}
        > */}
          <Form.Select placeholder='Categoria' option={categoriesFormat} 
        value={formik.values.category} onChange={(_, ...data)=>console.log(...data)} >
          <option option={categoriesFormat}></option>

          </Form.Select>
        {/* </Form.Group> */}
        </Col>

        <Col>
        <Form.Check 
          name="active"
          type="switch"
          id="active"
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
    text: item.title,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    title: "",
    price: "",
    category: "",
    active: true,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true)
  }
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
  }
}