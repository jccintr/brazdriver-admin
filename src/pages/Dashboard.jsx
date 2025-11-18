import React, { useEffect,useState,useContext } from 'react';
import DashCorridasCanceladas from "../components/dashboard/DashCorridasCanceladas"
import DashCorridasConcluidas from "../components/dashboard/DashCorridasConcluidas"
import DashCorridasSolicitadas from "../components/dashboard/DashCorridasSolicitadas"
import DashDrivers from "../components/dashboard/DashDrivers"
import DashDriversOnline from "../components/dashboard/DashDriversOnline"
import DashFaturamentoDia from "../components/dashboard/DashFaturamentoDia"
import DashFaturamentoMes from "../components/dashboard/DashFaturamentoMes"
import DashFaturamentoSemana from "../components/dashboard/DashFaturamentoSemana"
import DashPassageiros from "../components/dashboard/DashPassageiros"
import { Spinner } from 'flowbite-react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';


const Dashboard = () => {
  const [dashboard,setDashboard] = useState([]);
  const {loggedUser} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
       
    const getDashboard = async () => {
        setIsLoading(true);            
        let resp = await Api.getDashboardData(loggedUser.token);
        if (resp.status === 200){
           let json = await resp.json();
           setDashboard(json);
        }
        
       setIsLoading(false);
    }
    getDashboard();
    
}, []);

  return (
     <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
      <div className='flex flex-col items-center'>
     
       {!isLoading?<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pb-4 mx-auto'>
          
           <DashPassageiros value={dashboard.registeredPassengers}/>
           <DashDrivers value={dashboard.registeredDrivers}/>
           <DashDriversOnline value={dashboard.driversOnline}/>
           <DashCorridasConcluidas value={dashboard.completedRides}/>
           <DashCorridasCanceladas value={dashboard.cancelledRides}/>
           <DashCorridasSolicitadas value={dashboard.solicitedRides}/>
           <DashFaturamentoDia value={dashboard.completedRidesPerDayTotalValue?.toFixed(2)}/>
           <DashFaturamentoSemana value={dashboard.completedRidesPerWeekTotalValue?.toFixed(2)}/>
           <DashFaturamentoMes value={dashboard.completedRidesPerMonthTotalValue?.toFixed(2)}/>
           
           
        </div>:<Spinner className='mt-10' color="info" aria-label="Info spinner example" size="xl" />}
      </div>
      
    </div>
  )
}

export default Dashboard
