import React from 'react'
import "./LoginAdmin.css";
import { LoginForm } from '../../../components/Admin';
import "./LoginAdmin.css"

export function LoginAdmin() {
  return (
    <div className='login-admin'>
      <div className='login-admin-content'>
        <h1>Entrar al panel</h1>
        <LoginForm/>
      </div>
    </div>
  )
}
