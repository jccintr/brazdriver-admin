import React from 'react'
import { Table,Button } from 'flowbite-react';
import { FaEye,FaRegEdit  } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import LocalidadeChip from '../cards/LocalidadeChip';


const TableBairros = ({bairros,onAddLocalidade,onEditLocalidade}) => {
  return (
    <Table hoverable className='mt-4'>
                <Table.Head>
                      <Table.HeadCell>Nome</Table.HeadCell>
                      <Table.HeadCell>Localidades Cadastradas</Table.HeadCell>
                      <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y' >
                        {bairros.map((bairro) => (
                        
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={bairro._id}>
                                <Table.Cell>{bairro.nome}</Table.Cell>
                                <Table.Cell className='flex flex-wrap gap-1'>
                                    {bairro.localidades.map((loc, index) => (
                                        <div key={index}><LocalidadeChip localidade={loc} onEdit={() => onEditLocalidade(bairro, loc)} /></div>
                                    ))}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='flex flex-row gap-2'>
                                        <Button size="xs" pill color="yellow" onClick={()=>onAddLocalidade(bairro)}><FaPlusCircle/></Button>
                                        <Button size="xs" pill color="blue" onClick={()=>{}}><FaEye/></Button>
                                        <Button size="xs" pill color="success" onClick={()=>{}}><FaRegEdit/></Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        
                        ))}
                  </Table.Body>
            </Table>
  )
}

export default TableBairros