import React from 'react';
import { Button } from "react-bootstrap";
import "./HeaderPage.css";

export function HeaderPage(props) {
    const {title, btnTitle, btnClick, btnTitleTwo, btnClickTwo} = props;
  return (
    <div className='header-page-admin'>
        <h1>{title}</h1>
        <div>
            {btnTitle && (
                <Button onClick={btnClick}>
                    {btnTitle}
                </Button>
            )}
            {btnTitleTwo && (
                <Button onClick={btnClickTwo}>
                    {btnTitleTwo}
                </Button>
            )}
        </div>
    </div>
  )
}
