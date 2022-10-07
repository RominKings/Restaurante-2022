import React from 'react';
import {map, size} from 'lodash';
import { TableAdmin } from '../TableAdmin';


export function TableListAdmin(props) {
    const { tables } = props;

  return (
    <div className='table-admin'>
        {map(tables, (table) => (
            <TableAdmin key={table.number} table={table}/>
        ))}
    </div>
  )
}
