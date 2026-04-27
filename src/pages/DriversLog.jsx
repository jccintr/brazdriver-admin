import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import TableDriversLog from '../components/tables/TableDriversLogs';
import DataContext from '../context/DataContext';
import { Spinner } from 'flowbite-react';
import ModalDelete from '../components/modals/ModalDelete';

const DriversLog = () => {
    const [logs,setLogs] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const {loggedUser} = useContext(DataContext);
    const [openModal,setOpenModal] = useState(false);
    const [selected,setSelected] = useState(null);
    const [totalPages,setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
   

    useEffect(()=>{
        getLogs(1);
    }, []);

    const getLogs = async (page) => {
        setIsLoading(true);            
        let response = await Api.getDriversLog(loggedUser.token,page);
        if(response.ok){
          let json = await response.json();
           setTotalPages(json.pages);
           setLogs(json.data);
        }
        
       setIsLoading(false);
    }

    const onDelete = async (log) => {
     
        setSelected(log);
        setOpenModal(true);
       
 }
 
 const onDeleteAction = async () => {
    const response = await Api.deleteDriverLog(loggedUser.token,selected._id);
 
    if(response.ok){
       setOpenModal(false);
       getLogs();
    }
    
 }

 const onChangePage = async (page) => {
 
   setCurrentPage(page);
   getLogs(page);

 }


    return (
        <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
          <div className='flex flex-col items-center'>
          
          {!isLoading?<TableDriversLog currentPage={currentPage} onChangePage={onChangePage} totalPages={totalPages} onDelete={onDelete} logs={logs} />:<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
             
          </div>
          <ModalDelete onDeleteAction={onDeleteAction} openModal={openModal} setOpenModal={setOpenModal}/>
       </div>
      )
}

export default DriversLog