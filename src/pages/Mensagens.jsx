import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import { Spinner } from 'flowbite-react';
import TablePassengerMessages from '../components/tables/TablePassengerMessages';
import ModalDelete from '../components/modals/ModalDelete';
import ModalMensagem from '../components/modals/ModalMensagem';

const Mensagens = () => {
  const [mensagens,setMensagens] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const {loggedUser} = useContext(DataContext);
  const [openModal,setOpenModal] = useState(false);
  const [openModalMensagem,setOpenModalMensagem] = useState(false);
  const [modalData,setModalData] = useState(null);

  useEffect(()=>{
       
    
    getMensagens();
    
}, []);

const getMensagens = async () => {
  setIsLoading(true);            
  let response = await Api.getPassengersMessages(loggedUser.token);
  if(response.ok){
    let json = await response.json();
    setMensagens(json);
  }
  
 setIsLoading(false);
}

const onViewMessage = (mensagem) => {
 
      setModalData(mensagem);
      setOpenModalMensagem(true);
}

const onSetStatus = async (mensagem) => {
     
     const response = await Api.updateMensagemStatus(loggedUser.token,mensagem._id,!mensagem.lida);
     if(response.ok){
      setOpenModalMensagem(false);
      getMensagens();
   }

}

const onDelete = async (mensagem) => {
     
       setModalData(mensagem);
       setOpenModal(true);
      
}

const onDeleteAction = async () => {
   const response = await Api.deletePassengerMessage(loggedUser.token,modalData._id);

   if(response.ok){
      setOpenModal(false);
      getMensagens();
   }
   
}


return (
  <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
    <div className='flex flex-col items-center'>
    
    {!isLoading?<TablePassengerMessages onDelete={onDelete} setOpenModal={setOpenModal} onView={onViewMessage}  mensagens={mensagens} />:<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
       
    </div>
    <ModalDelete onDeleteAction={onDeleteAction} openModal={openModal} setOpenModal={setOpenModal}/>
    {modalData&&<ModalMensagem onSetStatus={onSetStatus} modalData={modalData} openModal={openModalMensagem} setOpenModal={setOpenModalMensagem}/>}
 </div>
)


}

export default Mensagens