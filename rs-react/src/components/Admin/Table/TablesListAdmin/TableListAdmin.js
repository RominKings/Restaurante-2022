import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FiRefreshCcw } from 'react-icons/fi';
import {map, size} from 'lodash';
import { TableAdmin } from '../TableAdmin';
import "./TableListAdmin.css";


export function TableListAdmin(props) {
    const { tables } = props;

  return (
    <div className='table-admin'>
      <Button variant="info" id='reload' onClick={() => console.log('OnRefetchReload')}><FiRefreshCcw/></Button>
        
        <div className='reload-toggle' >
          <span id='span-reload'>Reload automatico</span>
          <Form.Check aria-label="option 1" id='check-reload' toggle="true" onChange={(_, ...data) => console.log(data.checked)} />
        </div>
        
        {map(tables, (table) => (
            <TableAdmin key={table.number} table={table}/>
        ))}
    </div>
  )
}
