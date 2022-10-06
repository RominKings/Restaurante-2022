import React, {useEffect, useState} from 'react'
import {HeaderPage,TablaCategoriasAdmin, AddEditCategoriaForm } from '../../components/Admin' 
import { useCategory } from '../../hooks'
import { ModalBasic } from '../../components/Common'
import { Spinner } from "react-bootstrap";

export function CategoriesAdmin() {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, categories, getCategories, deleteCategory } = useCategory();

  useEffect(() => {getCategories()}, [refetch]);
 
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva categoria");
    setContentModal(<AddEditCategoriaForm onClose={openCloseModal} onRefetch={onRefetch} />);
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar categoria");
    setContentModal(
      <AddEditCategoriaForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = async (data) => {
    const result = window.confirm(`¿Eliminar categoría ${data.title}?`);
    if (result) {
      await deleteCategory(data.id);
      onRefetch();
    }
  };
console.log(categories)
  return (
    <>
        <HeaderPage title="Categorias" btnTitle="Nueva categoria" btnClick={addCategory}/>
        
      {loading ? (
       <Spinner  active inline="centered" animation="border" role="status">
       <span className="visually-hidden">Cargando...</span>
      </Spinner>
      ) : (
        <TablaCategoriasAdmin  
          categories={categories}
          updateCategory={updateCategory}
          deleteCategory={onDeleteCategory}
        />
      )}
        <ModalBasic
          show={showModal}
          onClose={openCloseModal}
          title={titleModal}
          children={contentModal}
        />

    </>
  );
}
