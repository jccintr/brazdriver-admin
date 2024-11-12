import { useState,useContext, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Button,TextInput, Spinner,Checkbox,Label} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';
import { HiOutlineArrowLeft } from "react-icons/hi";

 


const EditPassenger = () => {
  const {loggedUser} = useContext(DataContext);
  const params = useLocation();
  const {passengerId} = params.state;
  const [formData, setFormData] = useState({name:'',email:'',telefone:'',doc:'',ativo:true});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingData,setIsLoadingData] = useState(false);
  

  useEffect(()=>{
      
    const getPassenger= async () => {
        setIsLoadingData(true);            
        let response = await Api.getPassenger(loggedUser.token,passengerId);
        if (response.ok){
            let json = await response.json();
            setFormData(json);
        }
     
        setIsLoadingData(false);
    }
    getPassenger();
    
}, []);





const onUpdate = async (e) => {
//console.log(formData);
 
  setPublishError(null);

  if (formData.name.trim().length===0) {
    setPublishError('Informe o nome do passageiro.');
    return;
  }

  if (formData.email.trim().length===0) {
    setPublishError('Informe o email do passageiro.');
    return;
  }

  const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!validateEmail.test(formData.email)) {
    setPublishError('Email inválido.');
    return;
  }

  if (formData.telefone.trim().length===0) {
    setPublishError('Informe o telefone do passageiro.');
    return;
  }

  if (formData.doc.trim().length===0) {
    setPublishError('Informe o CPF do passageiro.');
    return;
  }

  setIsLoading(true);
  
 

  const response = await Api.updatePassenger(loggedUser.token,formData._id,formData);
     
  if (response.ok){
     navigate('/?tab=passengers');
  } else {
    let ret = await response.json();
    setPublishError(ret.erro);
  }
  setIsLoading(false);
  
}



  return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
    {!isLoadingData?(<>
    <Button color="blue" pill size='xs' onClick={()=> navigate('/?tab=passengers')}>
        <HiOutlineArrowLeft className="h-5 w-5" />
    </Button>
    <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Editando Passageiro</h1>
    <form  className='flex flex-col gap-4 mx-auto max-w-3xl' encType="multipart/form-data">
        
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="nome" value="Nome:" />
            <TextInput type='text' value={formData.name} placeholder='Nome do motorista' required id='nome'className='flex-1' onChange={(e) =>setFormData({ ...formData, name: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="email" value="E-mail:" />
            <TextInput disabled type='email' value={formData.email} placeholder='E-mail do motorista' required id='email'className='flex-1' onChange={(e) =>setFormData({ ...formData, email: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="telefone" value="Telefone:" />
            <TextInput type='text' value={formData.telefone} placeholder='Telefone do motorista' required id='telefone'className='flex-1' onChange={(e) =>setFormData({ ...formData, telefone: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="cpf" value="CPF:" />
            <TextInput type='text' value={formData.doc} placeholder='CPF do motorista' required id='cpf'className='flex-1' onChange={(e) =>setFormData({ ...formData, doc: e.target.value })}/>
        </div>
       
       
        <div className='flex gap-4 sm:flex-row justify-start items-center'>
             <Checkbox id="isAdmin" checked={formData.ativo} onChange={e=>setFormData({...formData,ativo: !formData.ativo})} />
             <Label className='dark:text-gray-100' htmlFor="isAdmin">Cadastro Ativo</Label>
             
        </div>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      <Button onClick={onUpdate} gradientMonochrome="info" disabled={isLoading}>{isLoading ? <Spinner size='sm'/>:'SALVAR ALTERAÇÕES'}</Button>
      <Button onClick={()=> navigate('/?tab=passengers')} gradientMonochrome="failure" >CANCELAR</Button>
      
    </form></>):<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
    </div>
  )
}

export default EditPassenger