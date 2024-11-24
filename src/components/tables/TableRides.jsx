import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaEye  } from "react-icons/fa";
import { Table,Button } from 'flowbite-react';

const formataData = (d)=> {

    const data = new Date(d);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

}


const TableRides = ({rides,onView}) => {
    

    return (
        <Table hoverable>
                <Table.Head>
                      <Table.HeadCell>Data</Table.HeadCell>
                      <Table.HeadCell>Passageiro</Table.HeadCell>
                      <Table.HeadCell className='hidden md:table-cell'>Motorista</Table.HeadCell>
                      <Table.HeadCell  className='hidden md:table-cell'>Valor</Table.HeadCell>
                      <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y' >
                {rides.map((ride) => (
                  
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={ride._id}>
                      <Table.Cell>{formataData(ride.data)}</Table.Cell>
                      <Table.Cell>
    
                            <div className='flex flex-row gap-2'>
                            {ride.passenger.avatar?<img className="md:w-[20px] h-[20px] rounded-full shadow-lg" src={`${ride.passenger.avatar}`} alt="" />:<FaUserCircle className='md:text-gray-400 dark:text-white' size={20} />}
                            {ride.passenger.name}
                            </div>
                       
                      </Table.Cell>
                      <Table.Cell className='hidden md:table-cell'>
    
                            {ride.driver!=null?<div className='flex flex-row gap-2'>
                            {ride.driver.avatar?<img className="md:w-[20px] h-[20px] rounded-full shadow-lg" src={`${ride.driver.avatar}`} alt="" />:<FaUserCircle className='md:text-gray-400 dark:text-white' size={20} />}
                            {ride.driver.name}
                            </div>:'n/a'}
                       
                      </Table.Cell>
                      
                      <Table.Cell  className='hidden md:table-cell'>{ride.valor.toFixed(2)}</Table.Cell>
                      <Table.Cell>
                        <Button size='xs' pill color="blue" onClick={()=>onView(ride._id)}><FaEye/></Button>
                      </Table.Cell>
                  </Table.Row>
                
                  ))}
                  </Table.Body>
            </Table>
      )
}

export default TableRides