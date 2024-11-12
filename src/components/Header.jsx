import React, {useContext} from 'react';
import { Navbar, Button } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from "react-icons/fa";
import DataContext from '../context/DataContext';
import useTheme from '../context/ThemeContext';
import logo from '../assets/logo-letter-460x60.png';
import Api from '../api/Api';

const Header = () => {
    const {themeMode,lightTheme,darkTheme} = useTheme();
    const {loggedUser,setLoggedUser} = useContext(DataContext);
    const path = useLocation().pathname;

    

   const onChangeColorMode = () => {
           if(themeMode === 'dark'){
               lightTheme();
           } else {
             darkTheme();
           }
    }

    const onLogout = async () => {

      setLoggedUser(null);
      navigate('/login');
    
    }

  return (
    <Navbar className='border-b-2'>
        <div className='flex flex-row gap-2 items-center'>
           <img src={logo} alt='logo' className='w-36' />
        </div>
       
        <div className='flex gap-2 md:order-2'>
            <Button className='justify-center items-center w-12 h-10' color='gray' pill onClick={()=>onChangeColorMode()}>
              {themeMode==='dark'?<FaSun/>:<FaMoon />}
            </Button>
            {loggedUser&&<Button gradientDuoTone='purpleToBlue' outline onClick={()=>onLogout()}>
                 Sair
               </Button>}
           
        </div>
       
    </Navbar>
  )
}

export default Header