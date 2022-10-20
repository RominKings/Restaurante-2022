import React, { useEffect , useState} from "react";
import { HeaderPage, TableTablesAdmin, AddEditTableForm } from "../../components/Admin";
import { useTable } from "../../hooks";
import { ModalBasic } from "../../components/Common/";
import { Spinner } from '../../assets/Spinner';
export function TablesAdmin(){

    const [showModal, setShowModal] = useState(false);      
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch,setRefetch]=useState(false);

    const {loading,tables,getTables,deleteTable}=useTable();

    useEffect(() => { getTables() } ,[refetch]);
    
    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    //funcion para crear nuevas mesas 
    const addTable = () => {
        setTitleModal("Crear mesa");
        setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
      };

    //Actualizar mesas
    const updateTable=(data)=> {
        setTitleModal("Actualizar mesa");
        setContentModal(
            <AddEditTableForm
                onClose={openCloseModal}
                onRefetch={onRefetch}
                table={data}
            />
        );
        openCloseModal();
    }
    //Eliminar
    const onDeleteTable = async (data) => {
        const result = window.confirm(`¿Eliminar mesa ${data.number}?`);
        if (result) {
          await deleteTable(data.id);
          onRefetch();
        }
      };
    console.log(tables)
    return (
        <>
           
            <HeaderPage title="Mesas" btnTitle="Crear nueva mesa" btnClick={addTable}/>
                {loading? (
                    <Spinner></Spinner>) 
                : (
                    <TableTablesAdmin tables={tables} updateTable={updateTable} deleteTable={onDeleteTable}/>)
                }
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
                    <button variant="danger" onClick={CloseEvent => openCloseModal(CloseEvent, 100)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>       */}

        
        
        </>
        
    )
}
