import React, {useEffect, useState} from 'react';
import { HeaderPage, TableUsers, AddEditUsersForm } from '../../components/Admin';
import { useUser } from '../../hooks';
import { ModalBasic } from '../../components/Admin';

//LLEVA LOS USUARIOS AL PANEL DE ADMINISTRADOR CON LA FUNCON GET USERS EN USEUSER
export function UsersAdmin() {
  const {/*loading,*/ users, getUsers} = useUser();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  

  useEffect(() => getUsers(), []);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(<AddEditUsersForm/>)
    openCloseModal();
  }

  return (
    <>
      <HeaderPage title="Usuarios" btnTitle="Nuevo Usuario" btnClick={addUser}/>
      <TableUsers users ={users}/>
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  )
}
