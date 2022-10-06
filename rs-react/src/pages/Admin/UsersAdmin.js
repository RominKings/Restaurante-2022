import React, {useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import { HeaderPage, TableUsers, AddEditUsersForm } from '../../components/Admin';
import { useUser } from '../../hooks';
import { ModalBasic } from '../../components/Common';

//LLEVA LOS USUARIOS AL PANEL DE ADMINISTRADOR CON LA FUNCON GET USERS EN USEUSER
export function UsersAdmin() {
  const {loading, users, getUsers, deleteUser} = useUser();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  

  useEffect(() => { getUsers() }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(<AddEditUsersForm onClose={openCloseModal} onRefetch={onRefetch}/>)
    openCloseModal();
  }

  const updateUser = (data) => {
    setTitleModal("Actualizar usuario");
    setContentModal(<AddEditUsersForm onClose={openCloseModal} onRefetch={onRefetch} user={data}/>)
    openCloseModal();
  }

  const onDeleteUser = async (data) => {
    const result = window.confirm(`¿Estas seguro de querer eliminar usuario ${data.email}?`);
    if (result) {
      try {
        await deleteUser(data.id)
        onRefetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <HeaderPage title="Usuarios" btnTitle="Nuevo Usuario" btnClick={addUser}/>
      {loading ? (<Spinner animation="border" variant="success" />):( 
      <TableUsers users ={users} updateUser={updateUser} deleteUser={onDeleteUser}/>)}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  )
}
