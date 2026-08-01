import InitialsAvatar from "../InitialsAvatar";
import util from '../../util.js';
import { Table } from 'flowbite-react';
import RideStatusBadge from "../RideStatusBadge"

export const TablePassengerRides = ({rides}) => {

     return (
    <Table hoverable className='mt-4'>
        <Table.Head>
           <Table.HeadCell>Data</Table.HeadCell>
           <Table.HeadCell className='hidden md:table-cell'>Status</Table.HeadCell>
           <Table.HeadCell className='hidden md:table-cell'>Motorista</Table.HeadCell>
           <Table.HeadCell className='hidden md:table-cell'>Valor</Table.HeadCell>
           <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
            {rides.map((ride) => (
                 <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={ride._id}>
                    <Table.Cell className='hidden md:table-cell'>{util.formataData(ride.data)}</Table.Cell>
                    <Table.Cell className='hidden md:table-cell'><RideStatusBadge status={ride.status} /></Table.Cell>
                    <Table.Cell>
                        <div className='flex flex-row gap-2'>
                            {ride.driver.avatar?<img className="md:w-[20px] h-[20px] rounded-full shadow-lg" src={`${ride.driver.avatar}`} alt="" />:<InitialsAvatar name={ride.driver.name} size={20} className="md:text-gray-400 dark:text-white" />}
                            {ride.driver.name}
                        </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{ride.valor.toFixed(2).replace('.',',')}</Table.Cell>              
                 </Table.Row>
            ))}
        </Table.Body>
    </Table>
  )
  
}
