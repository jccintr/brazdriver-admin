import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import CardDriver from '../components/cards/CardDriver';
import { CiSearch } from "react-icons/ci";
import { TextInput,Spinner,Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import ModalDriver from '../components/modals/ModalDriver';

const Drivers = () => {
  const [drivers,setDrivers] = useState([]);
  const [searchText,setSearchText] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {loggedUser} = useContext(DataContext);
  const [openModal,setOpenModal] = useState(false);
  const [modalData,setModalData] = useState(null);

  const driversFiltrado = drivers.filter(
		driver => driver.name && driver.name.toLowerCase().includes(searchText.toLowerCase()),
	);


  useEffect(()=>{
       
    const getDrivers = async () => {
        setIsLoading(true);            
        let response = await Api.getDrivers(loggedUser.token);
        if(response.ok){
          let json = await response.json();
           setDrivers(json);
        }
        
       setIsLoading(false);
    }
    getDrivers();
    
}, []);

const onViewDriver = async (driver) => {
      let response = await Api.getDriver(loggedUser.token,driver._id);
        if (response.ok){
            let json = await response.json();
            setModalData(json);
            setOpenModal(true);
        }
     
}

  return (
    <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
      <div className='flex flex-col items-center'>
      <div className='flex w-full flex-col md:flex-row md:justify-between'>
              <Button color="blue" onClick={()=>navigate('/new-driver')}>Novo Motorista</Button>
              <TextInput type='text' placeholder='pesquisar...' rightIcon={CiSearch} className='mt-2 md:mt-0 lg:inline' onChange={e => setSearchText(e.target.value)}/>
          </div>
          
          {driversFiltrado.length>0?<div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pb-4 mx-auto'>
            {driversFiltrado.map((driver)=><CardDriver key={driver._id} driver={driver} onView={onViewDriver}/>)}
          </div>:!isLoading?<h3 className='mt-10 text-gray-900 dark:text-white'>Motoristas não encontrados.</h3>:<Spinner className='mt-10' color="info" aria-label="Info spinner example" size="xl" />}
      </div>
      {modalData&&<ModalDriver openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}/>}
   </div>
  )
}

export default Drivers