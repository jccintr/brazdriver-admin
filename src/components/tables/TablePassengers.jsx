import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FaEye,FaRegEdit  } from "react-icons/fa";
import { Table,Rating, RatingStar,Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


const TablePassengers = ({passengers,onView}) => {
  const navigate = useNavigate()
  return (
    <Table hoverable className='mt-4'>
        <Table.Head>
           <Table.HeadCell>Nome</Table.HeadCell>
           <Table.HeadCell className='hidden md:table-cell'>Email</Table.HeadCell>
           <Table.HeadCell className='hidden md:table-cell'>Telefone</Table.HeadCell>
           <Table.HeadCell className='hidden md:table-cell'>Rating</Table.HeadCell>
           <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y' >
            {passengers.map((passenger) => (
                 <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={passenger._id}>
                    <Table.Cell>
                        <div className='flex flex-row gap-2'>
                            {passenger.avatar?<img className="md:w-[20px] h-[20px] rounded-full shadow-lg" src={`${passenger.avatar}`} alt="" />:<FaUserCircle className='md:text-gray-400 dark:text-white' size={20} />}
                            {passenger.name}
                        </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{passenger.email}</Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{passenger.telefone}</Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                      <div className='flex flex-row gap-'>
                        <Rating>
                          <RatingStar/>
                        </Rating>
                        {passenger.rating.toFixed(1)}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className='flex flex-row gap-2'>
                         <Button size="xs" pill color="blue" onClick={()=>onView(passenger)}><FaEye/></Button>
                         <Button size="xs" pill color="success" onClick={()=>navigate('/edit-passenger',{state:{passengerId:passenger._id}})}><FaRegEdit/></Button>
                      </div>
                    </Table.Cell>
                 </Table.Row>
            ))}
        </Table.Body>
    </Table>
  )
}

export default TablePassengers