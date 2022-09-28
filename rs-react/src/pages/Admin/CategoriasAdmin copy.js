import React, {useEffect} from 'react'
import { HeaderPage, TablaCategoriasAdmin } from '../../components/Admin' 
import { useCategorias } from '../../hooks'

export function TableTablesAdmin() {
    const {loading, categorias, getCategorias} = useCategorias()
    console.log(categorias);

    useEffect(() => getCategorias(), []);

  return (
    <>
        <HeaderPage title="Categorias" btnTitle="Nueva categoria"/>
        <TableTablesAdmin categories={categorias}/>

    </>
  )
}
