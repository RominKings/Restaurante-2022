import React, {useEffect} from 'react';
import { HeaderPage, TableUsers } from '../../components/Admin';
import { useUser } from '../../hooks';
//mport { AiOutlineLoading3Quarters } from "react-icons/ai";

//LLEVA LOS USUARIOS AL PANEL DE ADMINISTRADOR CON LA FUNCON GET USERS EN USEUSER
export function UsersAdmin() {
  const {/*loading,*/ users, getUsers} = useUser();

  useEffect(() => getUsers(), [ getUsers]);

  return (
    <>
      <HeaderPage title="Usuarios" btnTitle="Nuevo Usuarios" btnTitleTwo="Eliminar Usuarios"/>
      <TableUsers users ={users}/>
    </>
  )
}
