import React from 'react'
import "./LoginAdmin.css";
import { LoginForm } from '../../../components/Admin';
import "./LoginAdmin.css"

export function LoginAdmin() {
  return (
    <div className='login-admin'>
      <div className='login-admin-content col-10 col-sm-8 col-md-5 col-lg-5 col-xl-5' >
        <h1>Entrar al panel</h1>
        <hr/>
        <LoginForm/>
      </div>
    </div>
  )
}
