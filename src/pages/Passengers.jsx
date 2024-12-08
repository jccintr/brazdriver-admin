import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import CardPassenger from '../components/cards/CardPassenger';
import { CiSearch } from "react-icons/ci";
import { TextInput,Spinner,Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import ModalPassenger from '../components/modals/ModalPassenger';
import { FaTableList } from "react-icons/fa6";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import TablePassengers from '../components/tables/TablePassengers';
import GridPassengers from '../components/grids/GridPassengers';

const Passengers = () => {
  const [passengers,setPassengers] = useState([]);
  const [searchText,setSearchText] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {loggedUser} = useContext(DataContext);
  const [openModal,setOpenModal] = useState(false);
  const [modalData,setModalData] = useState(null);
  const [gridMode,setGridMode] = useState(true);

  const passengersFiltrado = passengers.filter(
		passenger => passenger.name && passenger.name.toLowerCase().includes(searchText.toLowerCase()),
	);


  useEffect(()=>{
       
    const getPassengers = async () => {
        setIsLoading(true);            
        let response = await Api.getPassengers(loggedUser.token);
        if(response.ok){
          let json = await response.json();
           setPassengers(json);
        }
        
       setIsLoading(false);
    }
    getPassengers();
    
}, []);

const onViewPassenger = async (passenger) => {
  let response = await Api.getPassenger(loggedUser.token,passenger._id);
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
              <div className='flex flex-row gap-2'>
                 <BsFillGrid3X3GapFill size={30} className={`${gridMode?'text-blue-400':'text-gray-200'}`} onClick={()=>setGridMode(true)}/>
                 <FaTableList size={30} className={`${gridMode?'text-gray-200':'text-blue-400'}`} onClick={()=>setGridMode(false)}/>
              </div>
              <TextInput type='text' placeholder='pesquisar...' rightIcon={CiSearch} className='mt-2 md:mt-0 lg:inline' onChange={e => setSearchText(e.target.value)}/>
          </div>
          
          {passengersFiltrado.length>0?gridMode?<GridPassengers passengers={passengersFiltrado} onView={onViewPassenger}/>:<TablePassengers passengers={passengersFiltrado} onView={onViewPassenger}/>:!isLoading?<h3 className='mt-10 text-gray-900 dark:text-white'>Passageiros não encontrados.</h3>:<Spinner className='mt-10' color="info" aria-label="Info spinner example" size="xl" />}
      </div>
      {modalData&&<ModalPassenger openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}/>}
   </div>
  )
}

export default Passengers