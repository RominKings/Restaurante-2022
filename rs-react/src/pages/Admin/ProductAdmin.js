import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { HeaderPage, TableProductAdmin, AddEditProductForm } from  "../../components/Admin";
import { useProduct } from '../../hooks';
import { ModalBasic } from '../../components/Common';

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const { loading, products, getProduct } = useProduct();

  useEffect(() => { getProduct() }, [])

  const openCloseModal = () => setShowModal((prev) => !prev);

  const addProduct = () => {
    setTitleModal("Nuevo Producto")
    setContentModal(<AddEditProductForm onClose={openCloseModal}/>)
    openCloseModal();
  }

  console.log(products);

  return (
    <>
        <HeaderPage title="Productos" btnTitle="Nuevo Producto" btnClick={addProduct}/>
        {loading ?(<Spinner animation="border" variant="success" />) : (
        <TableProductAdmin products={products}/>)}
        <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal}/>
    </>
  );
}
