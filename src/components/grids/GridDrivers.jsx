import CardDriver from '../cards/CardDriver'

const GridDrivers = ({drivers,onView,toggleDriverStatus}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pb-4 mx-auto'>
            {drivers.map((driver)=><CardDriver toggleDriverStatus={toggleDriverStatus}key={driver._id} driver={driver} onView={onView}/>)}
    </div>
  )
}

export default GridDrivers