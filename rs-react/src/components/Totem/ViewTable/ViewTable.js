import React, {useState, useEffect} from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { FiRefreshCcw } from 'react-icons/fi';
import { BsSquareFill } from 'react-icons/bs';
import Toast from 'react-bootstrap/Toast';
import background from "../../../assets/restaurante.jpg"
import { map } from 'lodash';
import "./ViewTable.css";
import { ViewTableLis } from '../ViewTableList/ViewTableLis';


export function ViewTable(props) {
    const { tables } = props;
    const [reload, setReload] = useState(false)
    const [autoReload, setAutoReload] = useState(false)
    //Para Toast
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(true);
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

    const onReload = () => setReload((prev) => !prev);

    useEffect (()=>{
      if(autoReload){
        const autoReloadAction = () => {
          onReload();
          setTimeout(() => {
            autoReloadAction();
          }, 5000)
        };
        autoReloadAction()
      }
    },[autoReload])

    const onCheckAutoReload = (check) => {
      if(check) {
        setAutoReload(check)
      } else {
        window.location.reload();
      }
    }

  return (
    
    
    <div>
      <div className='navbar-totem'>
          <div className=''>
              <Button onClick={toggleShowA} variant='dark' className="col-10 a-toast">
                  Presione para saber la guia de colores
                  
              </Button>
            <Button className='col-2  a-reload' variant='info' onClick={onReload}><FiRefreshCcw/></Button>
            </div>
          <div className=' div-reaload col-11 '  >
            <h6 className='' >Reload automático  <input
            type="checkbox"
            className=''
            toggle="false"
            onChange={(data) => onCheckAutoReload(data.target.checked)}
            checked={autoReload} 
            />     </h6>
           

   
          </div>
        </div>
        <div>
              <h1>Bienvenido a "Restaurante siglo XXI"</h1>
              <br></br>
        </div>

        <Toast show={showA} onClose={toggleShowA}>
              <Toast.Header>
                <strong>Aquí puedes saber el significado de los colores de las mesas</strong>
              </Toast.Header>
              <Toast.Body>
              <div>
                <BsSquareFill className='square-0'> </BsSquareFill>
                <strong className="me-auto">  La mesa esta libre</strong>
                </div>
                <div>
                <BsSquareFill className='square-1'> </BsSquareFill>
                <strong className="me-auto">  El pedido de la mesa esta siendo procesado</strong>
                </div>
                <div>
                <BsSquareFill className='square-2'> </BsSquareFill>
                <strong className="me-auto">  Comiendo...</strong>
                </div>
                <div>
                <BsSquareFill className='square-3'> </BsSquareFill>
                <strong className="me-auto">  La mesa se desocupara en los proximos minutos</strong>
                </div>
                <br></br>
                <br></br>
                <p>Recuerda que puedes estar pendiente del estado de la mesa mediante el link ...</p>
              </Toast.Body>
            </Toast>
        {/*  */}
        <div className="row col-11 mx-auto">
          {map(tables, (table) => (
              <ViewTableLis  key={table.number} table={table} reload={reload}/>
          ))}
        </div>
    </div>
  )
}