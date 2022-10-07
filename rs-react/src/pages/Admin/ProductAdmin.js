import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { HeaderPage, TableProductAdmin, AddEditProductForm } from  "../../components/Admin";
import { useProduct } from '../../hooks';
import { ModalBasic } from '../../components/Common';

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false);
  const { loading, products, getProduct, deleteProduct } = useProduct();

  useEffect(() => { getProduct() }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addProduct = () => {
    setTitleModal("Nuevo Producto")
    setContentModal(<AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch}/>)
    openCloseModal();
  }

  const updateProduct = (data) => {
    setTitleModal("Actualizar producto")
    setContentModal(<AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} product={data}/>)
    openCloseModal();
  }

  const onDeleteProduct = async (data) => {
    const result = window.confirm(`¿Eliminar producto ${data.title}?`);
    if (result) {
      await deleteProduct(data.id)
      onRefetch();
    }
  }

  return (
    <>
        <HeaderPage title="Productos" btnTitle="Nuevo Producto" btnClick={addProduct}/>
        {loading ?(<Spinner animation="border" variant="success" />) : (
        <TableProductAdmin products={products} updateProduct={updateProduct} deleteProduct={onDeleteProduct}/>)}
        <ModalBasic 
          show={showModal} 
          onClose={openCloseModal} 
          title={titleModal} 
          children={contentModal}/>
    </>
  );
}
