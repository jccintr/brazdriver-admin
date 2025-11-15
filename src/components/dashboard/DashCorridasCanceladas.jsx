import { FaRoad } from "react-icons/fa";

const DashCorridasCanceladas = ({value}) => {
  return (
    
    <div className="w-[330px] md:w-[300px] lg:w-[300px] py-5 px-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
               
          <div className='flex flex-row justify-start gap-2'>
                <FaRoad className='text-gray-500 dark:text-white' size={24}/>
                <span className='text-base font-semibold text-gray-500 dark:text-white'>Corridas Canceladas</span>
          </div>
            <div className='flex flex-row justify-end '>
              <span className='text-5xl text-right text-gray-500 dark:text-white'>{value}</span>
          </div>
                    
      </div>
   
  )
}

export default DashCorridasCanceladas