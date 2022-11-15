import React, {useEffect} from "react";
import {ViewTable} from "../../components/Totem"
import { Spinner } from '../../assets/Spinner';
import { useTable } from '../../hooks';
import background from '../../assets/restaurante.jpg'

export function ViewTableTotem() {
  const {loading, tables, getTables} = useTable();

  useEffect(() => { getTables() }, [])
  console.log(tables);

    return (
      <div style={{ backgroundImage: `url(${background})`,
                    
                    display: "flex",
                    top: "100%",
                    width: "100%",
                    height: "100%"
                    }}>
      
    
      <div className="div-totem">
        {loading ? (<Spinner ></Spinner>) : (
          <ViewTable tables={tables}/>
        )}

      </div>
      <html style={{ backgroundImage: `url(${background})` }}>

      </html>
      </div>
      
    );
  }