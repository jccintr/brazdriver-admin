import InitialsAvatar from "../InitialsAvatar";
import util from '../../util.js';
import { Table } from 'flowbite-react';
import RideStatusBadge from "../RideStatusBadge"

const TablePassengerRides = ({rides}) => {

     return (
    <Table hoverable className='mt-4'>
        <Table.Head>
           <Table.HeadCell>Data</Table.HeadCell>
           <Table.HeadCell >Status</Table.HeadCell>
           <Table.HeadCell >Motorista</Table.HeadCell>
           <Table.HeadCell >Valor</Table.HeadCell>
           
        </Table.Head>
        <Table.Body className='divide-y'>
            {rides.map((ride) => (
                 <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={ride._id}>
                    <Table.Cell>{util.formataData(ride.data)}</Table.Cell>
                    <Table.Cell><RideStatusBadge status={ride.status} /></Table.Cell>
                    <Table.Cell>
                        {ride.driver?<div className='flex flex-row gap-2'>
                            {ride.driver.avatar?<img className="md:w-[20px] h-[20px] rounded-full shadow-lg" src={`${ride.driver.avatar}`} alt="" />:<InitialsAvatar name={ride.driver.name} size={20} className="md:text-gray-400 dark:text-white" />}
                            {ride.driver.name}
                        </div>: <span className="text-gray-500 dark:text-gray-400">N/A</span>}
                    </Table.Cell>
                    <Table.Cell>{ride.valor.toFixed(2).replace('.',',')}</Table.Cell>              
                 </Table.Row>
            ))}
        </Table.Body>
    </Table>
  )
  
}

export default TablePassengerRides
