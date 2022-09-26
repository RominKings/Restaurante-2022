import React from 'react'
import { LoginAdmin } from '../../pages/Admin';
import { useAuth } from '../../hooks';
import { TopMenu } from '../../components/Admin';
import "./AdminLoyout.css"


export function AdminLoyout(props) {
    const {children} = props;
    const { auth } = useAuth();

    if(!auth) return <LoginAdmin/>;

    return (
      <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu>{children}</TopMenu>
      </div>

      <div className="admin-layout__main-content">
        
      </div>
    </div>
    );
  }
