import React, {useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import { FiRefreshCcw } from 'react-icons/fi';
import { map } from 'lodash';
import "./ViewTable.css";
import { ViewTableLis } from '../ViewTableList/ViewTableLis';


export function ViewTable(props) {
    const { tables } = props;
    const [reload, setReload] = useState(false)
    const [autoReload, setAutoReload] = useState(false)

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
    <div className='table-list-admin'>
      <Button variant="info" id='reload' onClick={onReload}><FiRefreshCcw/></Button>
        
        <div className='reload-toggle' >
          <span id='span-reload'>Reload automático</span>
          <Form.Check aria-label="option 1" id='check-reload' toggle="true"
          
          onChange={(data) => onCheckAutoReload(data.target.checked)}
          checked={autoReload} 
           />
        </div>
        <div className="row">
        {map(tables, (table) => (
            <ViewTableLis  key={table.number} table={table} reload={reload}/>
        ))}
        </div>
    </div>
  )
}