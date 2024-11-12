import { useState,useContext, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Button,TextInput, Spinner,Checkbox,Label} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaPix } from "react-icons/fa6";
 


const EditDriver = () => {
  const {loggedUser} = useContext(DataContext);
  const params = useLocation();
  const {driverId} = params.state;
  const [formData, setFormData] = useState({name:'',email:'',password:'',password2:'',telefone:'',doc:'',ativo:true,veiculo:{modelo:'',cor:'',placa:''},pix:{favorecido:'',chave:''}});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingData,setIsLoadingData] = useState(false);
  

  useEffect(()=>{
      
    const getDriver = async () => {
        setIsLoadingData(true);            
        let response = await Api.getDriver(loggedUser.token,driverId);
        if (response.ok){
            let json = await response.json();
            setFormData(json);
        }
     
        setIsLoadingData(false);
    }
    getDriver();
    
}, []);





const onUpdate = async (e) => {
//console.log(formData);
 
  setPublishError(null);

  if (formData.name.trim().length===0) {
    setPublishError('Informe o nome do motorista.');
    return;
  }

  if (formData.email.trim().length===0) {
    setPublishError('Informe o email do motorista.');
    return;
  }

  const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!validateEmail.test(formData.email)) {
    setPublishError('Email inválido.');
    return;
  }

  if (formData.telefone.trim().length===0) {
    setPublishError('Informe o telefone do motorista.');
    return;
  }

  if (formData.doc.trim().length===0) {
    setPublishError('Informe o CPF do motorista.');
    return;
  }

  if (formData.veiculo.modelo.trim().length===0 || formData.veiculo.cor.trim().length===0 || formData.veiculo.placa.trim().length===0) {
    setPublishError('Informe os dados do veículo.');
    return;
  }

  if (formData.pix.favorecido.trim().length===0 || formData.pix.chave.trim().length===0) {
    setPublishError('Informe os dados do Pix do motorista.');
    return;
  }

 

  setIsLoading(true);
  
 

  const response = await Api.updateDriver(loggedUser.token,formData._id,formData);
     
  if (response.ok){
     navigate('/?tab=drivers');
  } else {
    let ret = await response.json();
    setPublishError(ret.erro);
  }
  setIsLoading(false);
  
}



  return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
    {!isLoadingData?(<>
    <Button color="blue" pill size='xs' onClick={()=> navigate('/?tab=drivers')}>
        <HiOutlineArrowLeft className="h-5 w-5" />
    </Button>
    <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Editando Motorista</h1>
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
        <h2 className='text-center text-xl  font-semibold dark:text-gray-100'>Veículo</h2>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="modelo_veiculo" value="Modelo:" />
            <TextInput type='text' value={formData.veiculo.modelo} placeholder='Modelo do veículo' required id='modelo_veiculo' className='flex-1' onChange={(e) =>setFormData({ ...formData, veiculo:{...formData.veiculo,modelo: e.target.value} })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="cor_veiculo" value="Cor:" />
            <TextInput type='text' value={formData.veiculo.cor} placeholder='Cor predominante do veículo' required id='cor_veiculo' className='flex-1' onChange={(e) =>setFormData({ ...formData, veiculo:{...formData.veiculo,cor: e.target.value} })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="placa_veiculo" value="Placa:" />
            <TextInput type='text' value={formData.veiculo.placa} placeholder='Placa do Veículo' required id='placa_veiculo' className='flex-1' onChange={(e) =>setFormData({ ...formData, veiculo:{...formData.veiculo,placa: e.target.value} })}/>
        </div>
        <div className='flex flex-row gap-2 justify-center items-center'>
          <h2 className='text-center text-xl  font-semibold dark:text-gray-100'>PIX</h2>
          <FaPix className='text-xl dark:text-gray-100'/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="favorecido_pix" value="Favorecido:" />
            <TextInput type='text' value={formData.pix.favorecido} placeholder='Nome do favorecido no Pix' required id='favorecido_pix' className='flex-1' onChange={(e) =>setFormData({ ...formData, pix:{...formData.pix,favorecido: e.target.value} })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="chave_pix" value="Chave:" />
            <TextInput type='text' value={formData.pix.chave} placeholder='Chave pix' required id='chave_pix' className='flex-1' onChange={(e) =>setFormData({ ...formData, pix:{...formData.pix,chave: e.target.value} })}/>
        </div>
        <div className='flex gap-4 sm:flex-row justify-start items-center'>
             <Checkbox id="isAdmin" checked={formData.ativo} onChange={e=>setFormData({...formData,ativo: !formData.ativo})} />
             <Label className='dark:text-gray-100' htmlFor="isAdmin">Cadastro Ativo</Label>
             
        </div>
      <Button onClick={onUpdate} gradientMonochrome="info" disabled={isLoading}>{isLoading ? <Spinner size='sm'/>:'SALVAR ALTERAÇÕES'}</Button>
      <Button onClick={()=> navigate('/?tab=drivers')} gradientMonochrome="failure" >CANCELAR</Button>
      {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
    </form></>):<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
    </div>
  )
}

export default EditDriver