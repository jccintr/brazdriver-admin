import React,{useContext} from 'react';
import DataContext from '../context/DataContext';
import { Outlet,Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const {loggedUser} = useContext(DataContext);

  return loggedUser ? <Outlet/> : <Navigate to='/signin'/>;

}

export default PrivateRoute;