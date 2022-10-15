import React,{useState, useCallback} from 'react';
import { Form, Button,Container,Image } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../../../hooks";

export function AddEditCategoriaForm(props) {
  const { onClose,onRefetch,category  } = props;
  const [previewImage, setPreviewImage] = useState(category);
  const { addCategory, updateCategory } = useCategory();


  console.log(category)
  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) await updateCategory(category.id, formValue);
        else await addCategory(formValue);
        onRefetch()
        onClose();
        console.log(formValue)
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
    console.log(file)
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    
    <Form onSubmit={formik.handleSubmit}>
        <Form.Control 
          name="title"
          placeholder="Nombre de la categoria"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
      <br></br>
      <Container className='row'>
        <Button 
          fluid
          className='col-5' 
          type="button"   
          {...getRootProps()}>
          Subir imagen
        </Button>
        <input {...getInputProps()} />
      <Image src={previewImage} className="fluid" />
        <Button className='col-5' type="submit" >Crear</Button>
      </Container>
    </Form>
  )
}
function initialValues(data) {
  return {
    title: data ? data.title : "",
    image: data ? data.image :  "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
}
