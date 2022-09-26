import React from 'react'
import "./TableUsers.css";
import { map } from "lodash";
import { Table } from 'react-bootstrap';
//import {CgCheckO, AiOutlineCloseCircle} from "react-icons/ai";

export function TableUsers(props) {
    const {users} = props;
  return (
    <Table striped className='table-users-admin'>
      <thead>
        <tr>
          <th></th>
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
                <td>{user.firt_name}</td>
                <td>{user.last_name}</td>
                <td> 0 Active</td>
                <td> 0 Staff</td>
                <td> 0 Actions</td>
            </tr>
        ))}
      </tbody>
    </Table>
  )
}
