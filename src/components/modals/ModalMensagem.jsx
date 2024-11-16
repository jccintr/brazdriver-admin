import React from 'react'
import {Button, Modal } from "flowbite-react";


const formataData = (d)=> {

    const data = new Date(d);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

}

const ModalMensagem = ({onSetStatus,openModal,setOpenModal,modalData}) => {
  return (
    <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup>
    <Modal.Header className='mx-2'>
        <p className='text-base font-semibold leading-relaxed text-gray-500 dark:text-gray-400' >{modalData.tipo}</p>
    </Modal.Header>
        <Modal.Body>
        <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>{formataData(modalData.data)}</p>   
         <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>Remetente: <span className='font-semibold'>{modalData.passenger.name}</span></p>   
          <div className="my-4 space-y-6 p-4 bg-slate-200 dark:bg-slate-800 rounded-md">
            <p className="text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400">{modalData.message}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button size='sm' color='blue' onClick={()=>onSetStatus(modalData)}>MARCAR COMO {!modalData.lida?'LIDA': 'NÃO LIDA'}</Button>
        </Modal.Footer>
  </Modal>
  )
}

export default ModalMensagem