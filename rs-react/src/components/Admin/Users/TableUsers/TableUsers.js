import React from 'react'
import "./TableUsers.css";
import { map } from "lodash";
import { Table, Button } from 'react-bootstrap';
import {FcCheckmark, FcCancel} from 'react-icons/fc';
import { FiEdit3 } from "react-icons/fi";
import {FaTrashAlt} from "react-icons/fa";

export function TableUsers(props) {
    const {users} = props;
  return (
    <Table striped bordered hover className='table-users-admin'>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Activo</th>
          <th>Staff</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {map(users, (user, index) => (
            <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td> {user.is_active ? <FcCheckmark/> : <FcCancel/> }</td>
                <td> {user.is_staff ? <FcCheckmark/> : <FcCancel/> }</td>
                <Actions user={user}/>
            </tr>
        ))}
      </tbody>
    </Table>
  )
}

function Actions(props) {
  const {user} = props;
  return(
    <td textAlign="right" >
      <Button variant='warning' onClick={ () => console.log(`Actulizar usuario ${user.email}` )}>
        <FiEdit3 />
      </Button>
      <Button variant='danger' onClick={ () => console.log('Eliminar usuario')}><FaTrashAlt/> </Button>
    </td>
  )
}
