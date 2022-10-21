import React from 'react'
import {ViewTableTotem} from "../../pages";
import { useAuth } from '../../hooks';
import { LoginAdmin } from '../../pages/Admin';
import "./TotemLayout.css"


export function TotemLayout(props) {
  const {children} = props;
    const { auth } = useAuth();

    if(!auth) return <LoginAdmin/>;

    return (
      <div className="">
        <ViewTableTotem>{children}</ViewTableTotem>
      </div>
    );
  }
