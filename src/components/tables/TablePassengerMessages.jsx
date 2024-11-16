import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaRegTrashAlt,FaEye  } from "react-icons/fa";
import { Table,Button } from 'flowbite-react';
//import { useNavigate } from 'react-router-dom';


const formataData = (d)=> {

    const data = new Date(d);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

}

// const alert = (tipo) => {
//     if (tipo=='Reclamação'){
//         return 'failure';
//     }
//     if (tipo=='Dúvida'){
//         return 'warning';
//     }
//     if (tipo=='Sugestão'){
//         return 'success';
//     }
// }


const TablePassengerMessages = ({mensagens,onView,onDelete}) => {
  //const navigate = useNavigate();



  return (
    <Table hoverable>
            <Table.Head>
                  <Table.HeadCell>Data</Table.HeadCell>
                  <Table.HeadCell>Remetente</Table.HeadCell>
                  <Table.HeadCell className='hidden md:table-cell'>Tipo</Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
                 
            </Table.Head>
            <Table.Body className='divide-y' >
            {mensagens.map((mensagem) => (
              
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={mensagem._id}>
                  <Table.Cell className={!mensagem.lida?'font-bold':''}>{formataData(mensagem.data)}</Table.Cell>
                  <Table.Cell className={!mensagem.lida?'font-bold':''}>{mensagem.passenger.name}</Table.Cell>
                  <Table.Cell className={`hidden md:table-cell ${!mensagem.lida?'font-bold':''}`}>{mensagem.tipo}</Table.Cell>
                  <Table.Cell>
                    <div className='flex flex-row gap-2'>
                      <Button size='xs' pill color="blue" onClick={()=>onView(mensagem)}><FaEye/></Button>
                      <Button size='xs' pill color="failure" onClick={()=>onDelete(mensagem)}><FaRegTrashAlt/></Button>
                    </div>
                  </Table.Cell>
              </Table.Row>
            
              ))}
              </Table.Body>
        </Table>
  )
}

export default TablePassengerMessages