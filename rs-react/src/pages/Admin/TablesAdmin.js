import React, { useEffect , useState} from "react";
import { HeaderPage, TableTablesAdmin, AddEditTableForm } from "../../components/Admin";
import { useTable } from "../../hooks";
import { ModalBasic } from "../../components/Admin";

export function TablesAdmin(props){

    const [showModal, setShowModal] = useState(false);      
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch,setRefetch]=useState(false);

    const {loading,tables,getTables}=useTable();

    useEffect(() => getTables() ,[]);
    
    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    //funcion para crear nuevas mesas 
    const addTable = () => {
        setTitleModal("Crear mesa");
        setContentModal(
          <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
        );
        openCloseModal();
      };

    //Actualizar mesas
    const updateTable = (data) => {
        setTitleModal("Actualizar mesa");
        setContentModal(
          <AddEditTableForm
            onClose={openCloseModal}
            onRefetch={onRefetch}
            table={data}
          />
        );
        openCloseModal();
      };


    
    return (
        <>
           
            <HeaderPage title="Mesas" btnTitle="Crear nueva mesa" btnClick={addTable}/>
            <TableTablesAdmin tables={tables} updateTable={updateTable}/>
            <ModalBasic
                    show={showModal}
                    onClose={openCloseModal}
                    title={titleModal}
                    children={contentModal}
            />


            {/* <Modal id="modal" show={showModal} >
                <Modal.Title  title={titleModal}></Modal.Title>
                <Modal.Body children={contentModal}></Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={CloseEvent => openCloseModal(CloseEvent, 100)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>       */}

        
        
        </>
        
    )
}
