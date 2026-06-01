import toast from 'react-hot-toast';
import { useState,useContext} from 'react';
import {  Button,TextInput,Label,Textarea} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';

const DriversNotifications = () => {
   const [formData,setFormData] = useState({ title: '', body:''})
   const [isLoading,setIsLoading] = useState(false);
   const {loggedUser} = useContext(DataContext);



   const handleSubmit = async (e) => {
      e.preventDefault();
      if(formData.title.trim().length===0 || formData.body.trim().length===0) return toast.error("Preencha todos os campos por favor.");
      setIsLoading(true);

      try {
          await Api.sendMessageToAllDrivers(loggedUser.token,formData);
          toast.success("Notificação enviada com sucesso!");
          setFormData({ title: '', body:''});
      } catch (error) {
          console.error("Erro ao enviar notificação:", error);
          toast.error("Erro ao enviar notificação. Por favor, tente novamente.");
      } finally {
          setIsLoading(false);
      }
     
   }


  return (
    <div className='p-3 w-full mx-auto min-h-screen dark:bg-slate-800'>
       <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Notificação aos Motoristas</h1>
       <form onSubmit={handleSubmit}  className='flex flex-col gap-4 mx-auto max-w-3xl'>
          <div className='flex flex-col gap-4 justify-between'>
               <Label htmlFor="title" value="Título da Mensagem:" />
               <TextInput type='text' value={formData.title} placeholder='Título da Mensagem' required id='title'className='flex-1' onChange={(e) =>setFormData({ ...formData, title: e.target.value })}/>
          </div>
          <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="body" value="Mensagem:" />
            <Textarea id="body" placeholder='Digite a mensagem' value={formData.body} required rows={6} onChange={(e) =>setFormData({ ...formData, body: e.target.value })} />
          </div>
           <Button onClick={handleSubmit} gradientMonochrome="info" disabled={isLoading}>ENVIAR NOTIFICAÇÃO</Button>
      </form>
    </div>
   )




}

export default DriversNotifications