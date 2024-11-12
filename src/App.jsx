import React, {useState,useEffect} from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Passengers from './pages/Passengers';
import Rides from './pages/Rides';
import Header from './components/Header';
import NewDriver from './pages/NewDriver';
import EditDriver from './pages/EditDriver';
import EditPassenger from './pages/EditPassenger';



const App = () => {
  const [themeMode,setThemeMode] = useState('light');

  const darkTheme = () => {
       setThemeMode('dark');
  }

  const lightTheme = () => {
      setThemeMode('light');
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove('dark','light');
    document.querySelector('html').classList.add(themeMode);
  },[themeMode]);

 
  return (
    <DataProvider>
      <ThemeProvider value={{themeMode,darkTheme,lightTheme}}>
            <BrowserRouter>
              <Header />
              <Routes>
                  <Route path="/login" element={<Login/>}/>
                  <Route element={<PrivateRoute/>}>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/drivers" element={<Drivers/>}/>
                      <Route path="/new-driver" element={<NewDriver/>}/>
                      <Route path="/edit-driver" element={<EditDriver/>}/>
                      <Route path="/edit-passenger" element={<EditPassenger/>}/>
                      <Route path="/passengers" element={<Passengers/>}/>
                      <Route path="/rides" element={<Rides/>}/>
                  </Route>
              </Routes>
             
            </BrowserRouter>
        </ThemeProvider>
    </DataProvider>
  )



}

export default App
