import  { useEffect,useState } from 'react';
import Api from '../api/Api';

const Mapa = () => {
   const [drivers,setDrivers] = useState([]);
   const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
           
        const getDrivers = async () => {
            setIsLoading(true);            
            let response = await Api.getDriversOnline();
            if(response.ok){
              let json = await response.json();
               setDrivers(json);
            }
            
           setIsLoading(false);
        }
        getDrivers();
        
    }, []);

  return (
    <div>{drivers.map((driver)=><h2 key={driver._id}>{driver.name}</h2>)}</div>
  )
}

export default Mapa