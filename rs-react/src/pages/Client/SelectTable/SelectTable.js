import React, { useState } from "react";
import { useTable } from "../../../hooks";
import "./SelectTable.css";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom"; 
 
    export function SelectTable(){

    let navigate = useNavigate();   
   
    const [tableNum, setTableNum] = useState(null);
    const [error, setError] = useState(null);
    const { isExistTable } = useTable();
    console.log(navigate);

    const onSubmit = async () => { setError(null);     
        if (!tableNum) {
            setError("No has introducido ninguna mesa");     
        }   else {       
            const exist = await isExistTable(tableNum);       
            if (exist) navigate(`/client/${tableNum}`);       
            else setError("La mesa introducida no existe"); 
        }
        };

    return (
        <div className="text-center continer-fluid select-table">
            <div className="div-login">
                <h1> Bienvenido a Restaurante XXI</h1>
                <hr></hr>
                <h2> Introduce un número de mesa</h2>
                <Form noValidate onSubmit={onSubmit}>
                    <br></br>
                    <Form.Input                        
                        placeholder="Número de mesa" 
                        type="number"
                        onChange={(data) => setTableNum(data.target.value)}
                    />
                    <br></br>
                    
                    <div className="d-grid gap-2">
                    <Button className="btn btn-dark">Entrar</Button>
                    </div>
                    <p> {error}</p>
                    
                </Form>
                
            </div>
            
        </div>
    )
}