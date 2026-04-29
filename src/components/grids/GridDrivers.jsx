import React from 'react'
import CardDriver from '../cards/CardDriver'

const GridDrivers = ({drivers,onView}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pb-4 mx-auto'>
            {drivers.map((driver)=><CardDriver key={driver._id} driver={driver} onView={onView}/>)}
    </div>
  )
}

export default GridDrivers