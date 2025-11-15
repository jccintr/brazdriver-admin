import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Dashboard from './Dashboard';
import Mapa from './Mapa';
import Passengers from './Passengers';
import Drivers from './Drivers';
import Rides from './Rides';
import Mensagens from './Mensagens';
import PassengersLog from './PassengersLog';
import RidesCancelled from './RidesCancelled';
import RidesSolicited from './RidesSolicited';





const Home = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  return (
     <div className='min-h-screen flex flex-col md:flex-row dark:bg-slate-800'>
      <div className=''>
        <SideBar/>
      </div>
       {tab === 'dashboard' && <Dashboard />}
        {tab === 'mapa' && <Mapa />}
       {tab === 'passengers' && <Passengers />}
       {tab === 'passengersLogs' && <PassengersLog />}
       {tab === 'drivers' && <Drivers />}
       {tab === 'rides' && <Rides />}
       {tab === 'rides-cancelled' && <RidesCancelled/>}
       {tab === 'rides-solicited' && <RidesSolicited/>}
       {tab === 'mensagens' && <Mensagens />}
       
    </div>
  )
}

export default Home