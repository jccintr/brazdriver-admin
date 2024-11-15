import React from 'react'
import { FaUserCircle } from "react-icons/fa";

import { Table,Alert } from 'flowbite-react';
//import { useNavigate } from 'react-router-dom';


const formataData = (d)=> {

    const data = new Date(d);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

}

const alert = (tipo) => {
    if (tipo=='Reclamação'){
        return 'failure';
    }
    if (tipo=='Dúvida'){
        return 'warning';
    }
    if (tipo=='Sugestão'){
        return 'success';
    }
}


const TablePassengerMessages = ({mensagens}) => {
  //const navigate = useNavigate();
  return (
    <Table hoverable>
            <Table.Head>
                  <Table.HeadCell>Data</Table.HeadCell>
                  <Table.HeadCell>Passageiro</Table.HeadCell>
                  <Table.HeadCell>Tipo</Table.HeadCell>
                 
            </Table.Head>
            <Table.Body className='divide-y' >
            {mensagens.map((mensagem) => (
              
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={mensagem._id}>
                  <Table.Cell>{formataData(mensagem.data)}</Table.Cell>
                  <Table.Cell>

                    <div className='flex flex-row gap-2'>
                    {mensagem.passenger.avatar?<img className="md:w-[20px] h-[20px] rounded-full shadow-lg" src={`${mensagem.passenger.avatar}`} alt="" />:<FaUserCircle className='md:text-gray-400 dark:text-white' size={20} />}
                    {mensagem.passenger.name}
                    </div>
                   
                  </Table.Cell>
                  <Table.Cell>
                  <Alert color={alert(mensagem.tipo)} rounded>
                      {mensagem.tipo}
                  </Alert>
                    </Table.Cell>
                 
              </Table.Row>
            
              ))}
              </Table.Body>
        </Table>
  )
}

export default TablePassengerMessages