import { useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button,TextInput, Spinner,Label} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';
import { FaLock } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaPix } from "react-icons/fa6";


const NewDriver = () => {
  //const {name,email,password,telefone,doc,veiculo{modelo,cor,placa},pix{favorecido,chave}} = req.body;
  const {loggedUser} = useContext(DataContext);
  const [formData, setFormData] = useState({name:'',email:'',password:'',password2:'',telefone:'',doc:'',veiculo:{modelo:'',cor:'',placa:''},pix:{favorecido:'',chave:''}});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  

  





const onAdd = async (e) => {
console.log(formData);
 
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

  if (formData.password.trim().length===0) {
    setPublishError('Informe a senha de acesso.');
    return;
  }

  if (formData.password !== formData.password2) {
    setPublishError('As senhas informadas são diferentes.');
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
  
 

  const response = await Api.addDriver(loggedUser.token,formData);
     
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
    <Button color="blue" pill size='xs' onClick={()=> navigate('/?tab=drivers')}>
        <HiOutlineArrowLeft className="h-5 w-5" />
    </Button>  
    <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Novo Motorista</h1>
    <form  className='flex flex-col gap-4 mx-auto max-w-3xl' encType="multipart/form-data">
        
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="nome" value="Nome:" />
            <TextInput type='text' value={formData.name} placeholder='Nome do motorista' required id='nome'className='flex-1' onChange={(e) =>setFormData({ ...formData, name: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="email" value="E-mail:" />
            <TextInput type='email' value={formData.email} placeholder='E-mail do motorista' required id='email'className='flex-1' onChange={(e) =>setFormData({ ...formData, email: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="password" value="Senha de Acesso:" />
            <TextInput icon={FaLock} type='password' value={formData.password} placeholder='Senha de acesso' required id='password' className='flex-1' onChange={(e) =>setFormData({ ...formData, password: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="password2" value="Confirme a Senha:" />
            <TextInput icon={FaLock} type='password' value={formData.password2} placeholder='Confirme a senha' required id='password2' className='flex-1' onChange={(e) =>setFormData({ ...formData, password2: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="telefone" value="Telefone:" />
            <TextInput type='text' value={formData.telefone} placeholder='Telefone do motorista' required id='telefone'className='flex-1' onChange={(e) =>setFormData({ ...formData, telefone: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="telefone" value="CPF:" />
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
      {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      <Button onClick={onAdd} gradientMonochrome="info" disabled={isLoading}>{isLoading ? <Spinner size='sm'/>:'ADICIONAR MOTORISTA'}</Button>
      <Button onClick={()=> navigate('/?tab=drivers')} gradientMonochrome="failure" >CANCELAR</Button>
      
    </form>
    </div>
  )
}

export default NewDriver