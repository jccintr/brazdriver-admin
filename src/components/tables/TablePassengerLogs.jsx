import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaRegTrashAlt  } from "react-icons/fa";
import { Table,Button,Pagination } from 'flowbite-react';
import { paginationCustomTheme } from '../../theme/paginationTheme';





const formataData = (d)=> {

    const data = new Date(d);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

}



const TablePassengersLog = ({logs,onDelete,totalPages,onChangePage,currentPage}) => {
 
  const onPageChange =  (page) => onChangePage(page);


  return (<>
    <Table hoverable>
            <Table.Head>
                  <Table.HeadCell>Data</Table.HeadCell>
                  <Table.HeadCell>Passageiro</Table.HeadCell>
                  <Table.HeadCell>Ação</Table.HeadCell>
                  <Table.HeadCell className='hidden md:table-cell'>Info</Table.HeadCell>
                  <Table.HeadCell className='hidden md:table-cell'></Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y' >
            {logs.map((log) => (
              
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={log._id}>
                  <Table.Cell>{formataData(log.data)}</Table.Cell>
                  <Table.Cell>

                    <div className='flex flex-row gap-2'>
                    {log.passenger.avatar?<img className="md:w-[20px] h-[20px] rounded-full shadow-lg" src={`${log.passenger.avatar}`} alt="" />:<FaUserCircle className='md:text-gray-400 dark:text-white' size={20} />}
                    {log.passenger.name}
                    </div>
                   
                  </Table.Cell>
                  <Table.Cell>{log.action}</Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>{log.info}</Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>
                    <Button size='xs' pill color="failure" onClick={()=>onDelete(log)}><FaRegTrashAlt/></Button>
                  </Table.Cell>
              </Table.Row>
            
              ))}
              </Table.Body>
        </Table>
         
          <Pagination 
            theme={paginationCustomTheme}
            className='hidden lg:block mb-2 '
            layout="pagination"
            currentPage={currentPage} 
            totalPages={totalPages}
            onPageChange={onPageChange} 
            previousLabel="Anterior"
            nextLabel="Próxima"
          />
           <Pagination 
            theme={paginationCustomTheme}
            className='mb-2 md:hidden'
            layout="navigation"
            currentPage={currentPage} 
            totalPages={totalPages}
            onPageChange={onPageChange} 
            previousLabel="Anterior"
            nextLabel="Próxima"
          />
        </>
  )
}

export default TablePassengersLog