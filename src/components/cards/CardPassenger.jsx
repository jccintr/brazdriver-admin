import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Button } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { FaCrown } from "react-icons/fa";
import { Rating } from "flowbite-react";

const CardPassenger = ({passenger}) => {
  const navigate = useNavigate()
  return (
    <div className="w-[330px] md:w-[250px] lg:w-[300px] py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
    
    <div className="flex flex-col items-center">
    {passenger.avatar?<img className="mb-3 w-[60px] h-[60px] rounded-full shadow-lg" src={`${passenger.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white mb-3' size={60} />}
      
      <div className='flex flex-row gap-1 items-center'>
         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{passenger.name}</h5>
          {passenger.isAdmin&&<FaCrown className="mb-1 text-amber-400" size={20} />}
      </div>
      <Rating>
        <Rating.Star />
        <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{passenger.rating.toFixed(1)}</p>
      </Rating>
      
      
     
      <Button size="sm" className='mt-4' color="blue" onClick={()=>navigate('/edit-cliente',{state:{cliente}})}>Editar</Button>
     
    </div>
  </div>
  )
}

export default CardPassenger