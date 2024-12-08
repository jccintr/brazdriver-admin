import React from 'react';
import CardPassenger from '../cards/CardPassenger';


const GridPassengers = ({passengers,onView}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pb-4 mx-auto'>
            {passengers.map((passenger)=><CardPassenger key={passenger._id} passenger={passenger} onView={onView}/>)}
    </div>
  )
}

export default GridPassengers