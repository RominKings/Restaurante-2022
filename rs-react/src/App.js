import React from "react";
import { ToastContainer } from "react-toastify";
//import { Button } from "semantic-ui-react";
import "./App.css";
import { Navegacion } from "./routes";
import { AuthProvider } from "./context/AuthContext";
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'       
//import { AdminLoyout, ClientLayout } from "./Layouts";
import ReactDOM from 'react-dom';
export default function App(){
  return (
    <AuthProvider>
      <div className="app">
        <Navegacion/>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </div>
    </AuthProvider>
  )
}
