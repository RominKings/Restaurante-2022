import { ErrorMessage } from "formik";
import React, { useEffect , useState} from "react";
import { HeaderPage, TableTablesAdmin, AddEditTableForm } from "../../components/Admin";
import { useTable } from "../../hooks";
import {Modal,Button} from 'react-bootstrap/';
import { divide } from "lodash";

export function TablesAdmin(props){

    const [showModal, setShowModal] = useState(false);      
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch,setRefetch]=useState(false);
    const {loading,tables,getTables}=useTable();

    useEffect(() => getTables() ,[]);
    
    const openCloseModal = (CloseEvent, num) => setShowModal ((prev) => !prev );
    const onRefetch=()=>setRefetch((prev)=>!prev);

    //funcion para crear nuevas mesas 
    const addTable = () => {
        setTitleModal("Crear mesa");
        setContentModal(
          <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch}/>
        );
        openCloseModal();
      };

    //Actualizar mesas
    
    console.log(tables)
    return (
        <>
           
            <HeaderPage title="Mesas" btnTitle="Crear nueva mesa" btnClick={addTable}/>
            <TableTablesAdmin tables={tables}/>
        <>
            <Modal id="modal" show={showModal} >
                <Modal.Title  title={titleModal}></Modal.Title>
                <Modal.Body children={contentModal}></Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={CloseEvent => openCloseModal(CloseEvent, 100)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>      

        
        </>
        </>
        
    )
}
