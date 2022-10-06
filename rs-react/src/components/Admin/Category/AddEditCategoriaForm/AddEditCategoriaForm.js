import React,{useState, useCallback} from 'react';
import { Form, Button,Container,Image } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../../../hooks";

export function AddEditCategoriaForm(props) {

  const { onClose, onRefetch, category } = props;
  const [previewImage, setPreviewImage] = useState(category.image || null);
  const { addCategory, updateCategory } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange: false,
    
    onSubmit: async (formValue) => {
      try {
        if (category) await updateCategory(category.id, formValue);
        else await addCategory(formValue);

        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    
    <Form  onSubmit={formik.handleSubmit} >
          <Form.Control 
            name="title"
            placeholder="Nombre de la categoria"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}
          />
      <br></br>
      
        <Button 
          className='col-5' 
          type="button"   
          {...getRootProps()}>
          Subir imagen
        </Button>
        <input {...getInputProps()} />
      <Image src={previewImage} fluid />
        <Button className='col-5' type="submit" >Crear</Button>
    </Form>
  )
}
function initialValues(data) {
  return {
    title: "",
    image: "",
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
