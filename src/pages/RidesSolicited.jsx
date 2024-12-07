import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import { Spinner } from 'flowbite-react';
import TableRides from '../components/tables/TableRides';
import { useNavigate } from 'react-router-dom';

const RidesSolicited = () => {
  const [rides,setRides] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const {loggedUser} = useContext(DataContext);
  const navigate = useNavigate();
  const [totalPages,setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    getSolicitedRides(1);
 }, []);

 const getSolicitedRides = async (page) => {
  setIsLoading(true);            
  let response = await Api.getSolicitedRides(loggedUser.token,page);
  if(response.ok){
    let json = await response.json();
    setTotalPages(json.pages);
    setRides(json.data);
  }
  
 setIsLoading(false);
}

const onView = (rideId) => navigate('/ride',{state:{rideId:rideId}});

const onChangePage = async (page) => {
  setCurrentPage(page);
  getSolicitedRides(page);
}


  return (
    <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
      <div className='flex flex-col items-center'>
        
        {!isLoading?<TableRides  totalPages={totalPages} currentPage={currentPage} onChangePage={onChangePage} rides={rides} onView={onView} />:<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
        
      </div>
 </div>
  )
}

export default RidesSolicited