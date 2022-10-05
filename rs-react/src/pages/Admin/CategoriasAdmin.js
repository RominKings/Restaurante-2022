import React, {useEffect, useState} from 'react'
import { HeaderPage, TablaCategoriasAdmin, AddEditUsersForm } from '../../components/Admin' 
import { useCategorias } from '../../hooks'
import { ModalBasic } from '../../components/Common'

export function CategoriasAdmin() {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] =useState(null)
    const [contentModal, setContentModal] =useState(null)
    const {loading, categorias, getCategorias} = useCategorias()
    console.log(categorias);

    useEffect(() => { getCategorias() }, []);

    const openCloseModal = () => setShowModal((prev) => !prev);

    const addCategoria = () => {
      setTitleModal ("Nueva Categoria");
      setContentModal (<AddEditUsersForm/>)
      openCloseModal()
    }

  return (
    <>
        <HeaderPage title="Categorias" btnTitle="Nueva categoria" btnClick={addCategoria}/>
        <TablaCategoriasAdmin categories={categorias}/>
        <ModalBasic
          show={showModal}
          onClose={openCloseModal}
          title={titleModal}
          children={contentModal}
        />

    </>
  )
}
