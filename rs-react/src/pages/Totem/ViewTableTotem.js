import React, {useEffect} from "react";
import {ViewTable} from "../../components/Totem"
import { Spinner } from '../../assets/Spinner';
import { useTable } from '../../hooks';

export function ViewTableTotem() {
  const {loading, tables, getTables} = useTable();

  useEffect(() => { getTables() }, [])
  console.log(tables);

    return (
      <div className="row">
        {loading ? (<Spinner animation="border" variant="success" />) : (
          <ViewTable tables={tables}/>
        )}
      </div>
    );
  }