import {useEffect, useState,} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { HiChartPie } from "react-icons/hi";
//import DataContext from '../context/DataContext';
import { FaRoad } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { sideBarCustomTheme } from '../theme/sideBarTheme';

const SideBar = () => {
    const location = useLocation();
    const [tab,setTab] = useState('');
    //const {setLoggedUser,loggedUser} = useContext(DataContext);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
       
        if(tabFromUrl){
          setTab(tabFromUrl);
        }
        
      },[location.search]);

      const handleSignout = async () => {
        // try {
        //   const response = await fetch('/api/auth/logout', {
        //     method: 'POST',
        //   });
        //   if(response.status === 200){
        //     setLoggedUser(null);
        //     navigate('/signin');
        //  } 
         
        // } catch (error) {
          
        // }
      };




  return (
    <Sidebar className='w-full md:w-56' theme={sideBarCustomTheme}>
    <Sidebar.Items>
        <Sidebar.ItemGroup>
              <Link to='/?tab=dashboard'>
                    <Sidebar.Item  active={tab === 'dashboard' || !tab} icon={HiChartPie} as='div'>Dashboard</Sidebar.Item>
              </Link>
               <Link to='/?tab=mapa'>
                    <Sidebar.Item  active={tab === 'mapa' || !tab} icon={FaMapLocationDot} as='div'>Mapa</Sidebar.Item>
              </Link>
              <Link to='/?tab=passengers'>
                    <Sidebar.Item active={tab === 'passengers' || !tab}  icon={FaUserAlt} as='div'>Passageiros</Sidebar.Item>
              </Link>
              <Link to='/?tab=drivers'>
                    <Sidebar.Item active={tab === 'drivers' || !tab} icon={FaCar} as='div'>Motoristas</Sidebar.Item>
              </Link>
              <Sidebar.Collapse icon={FaRoad} label="Corridas">
                  <Link to='/?tab=rides'>
                        <Sidebar.Item active={tab === 'rides' || !tab} as='div'>Concluídas</Sidebar.Item>
                  </Link>
                  <Link to='/?tab=rides-cancelled'>
                        <Sidebar.Item active={tab === 'rides-cancelled' || !tab} as='div'>Canceladas</Sidebar.Item>
                  </Link>
                  <Link to='/?tab=rides-solicited'>
                        <Sidebar.Item active={tab === 'rides-solicited' || !tab} as='div'>Solicitadas</Sidebar.Item>
                  </Link>
              </Sidebar.Collapse>
              <Link to='/?tab=mensagens'>
                    <Sidebar.Item active={tab === 'mensagens' || !tab} icon={FaEnvelope} as='div'>Mensagens</Sidebar.Item>
              </Link>
              <Link to='/?tab=passengersLogs'>
                    <Sidebar.Item active={tab === 'passengersLogs' || !tab} icon={FaListUl} as='div'>Logs</Sidebar.Item>
              </Link>
             
        </Sidebar.ItemGroup>
    </Sidebar.Items>
</Sidebar>
  )
}

export default SideBar