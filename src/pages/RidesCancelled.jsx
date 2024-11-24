import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import { Spinner } from 'flowbite-react';
import TableRides from '../components/tables/TableRides';
import { useNavigate } from 'react-router-dom';

const RidesCancelled = () => {
  const [rides,setRides] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const {loggedUser} = useContext(DataContext);
  const navigate = useNavigate()

  useEffect(()=>{
       
    const getCancelledRides = async () => {
        setIsLoading(true);            
        let response = await Api.getCancelledRides(loggedUser.token);
        if(response.ok){
          let json = await response.json();
           setRides(json);
        }
        
       setIsLoading(false);
    }
    getCancelledRides();
    
}, []);

const onView = (rideId) => {

  navigate('/ride',{state:{rideId:rideId}});
}

  return (
    <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
      <div className='flex flex-col items-center'>
        
        {!isLoading?<TableRides rides={rides} onView={onView} />:<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
        
      </div>
 </div>
  )
}

export default RidesCancelled