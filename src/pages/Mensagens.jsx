import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import { Spinner } from 'flowbite-react';
import TablePassengerMessages from '../components/tables/TablePassengerMessages';

const Mensagens = () => {
  const [mensagens,setMensagens] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const {loggedUser} = useContext(DataContext);

  useEffect(()=>{
       
    const getMensagens = async () => {
        setIsLoading(true);            
        let response = await Api.getPassengersMessages(loggedUser.token);
        if(response.ok){
          let json = await response.json();
          setMensagens(json);
        }
        
       setIsLoading(false);
    }
    getMensagens();
    
}, []);


return (
  <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
    <div className='flex flex-col items-center'>
    
    {!isLoading?<TablePassengerMessages mensagens={mensagens} />:<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
       
    </div>
   
 </div>
)


}

export default Mensagens