import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import TablePassengersLog from '../components/tables/TablePassengerLogs';
import DataContext from '../context/DataContext';
import { Spinner } from 'flowbite-react';

const PassengersLog = () => {
    const [logs,setLogs] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    //const navigate = useNavigate();
    const {loggedUser} = useContext(DataContext);
   

    useEffect(()=>{
       
        const getLogs = async () => {
            setIsLoading(true);            
            let response = await Api.getPassengersLog(loggedUser.token);
            if(response.ok){
              let json = await response.json();
               setLogs(json);
            }
            
           setIsLoading(false);
        }
        getLogs();
        
    }, []);


    return (
        <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
          <div className='flex flex-col items-center'>
          
          {!isLoading?<TablePassengersLog logs={logs} />:<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
             
          </div>
         
       </div>
      )
}

export default PassengersLog