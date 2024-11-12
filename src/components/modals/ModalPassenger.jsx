import React from 'react'
import {Checkbox, Label, Modal,Rating } from "flowbite-react";
import { FaUserCircle } from "react-icons/fa";


const ModalPassenger = ({openModal,setOpenModal,modalData}) => {
  return (
    <Modal show={openModal} size="sm" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>

        <div className="space-y-4">
        <div className='flex flex-row gap-2'>
           {modalData.avatar?<img className="mb-3 w-[60px] h-[60px] rounded-full shadow-lg" src={`${modalData.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white mb-3' size={60} />}
           <div className='flex flex-col gap-2'>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{modalData.name}</h3>
              <Rating>
                <Rating.Star />
                 <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{modalData.rating.toFixed(1)}</p>
              </Rating>
           </div>
        </div>

        <div className='flex flex-row gap-2 items-center'>
               <p className="text-base font-medium text-gray-900 dark:text-white">E-mail:</p>
               <p className='text-base font-semibold text-gray-900 dark:text-white'>{modalData.email}</p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
               <p className="text-base font-medium text-gray-900 dark:text-white">Telefone:</p>
               <p className='text-base font-semibold text-gray-900 dark:text-white'>{modalData.telefone}</p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
               <p className="text-base font-medium text-gray-900 dark:text-white">CPF:</p>
               <p className='text-base font-semibold text-gray-900 dark:text-white'>{modalData.doc}</p>
        </div>
        <div className="flex items-center gap-2">
                <Checkbox id="ativo" checked={modalData.ativo} disabled />
                <Label htmlFor="remember" className='text-base font-semibold text-gray-900 dark:text-white'>Ativo</Label>
        </div>
       
        
           
          </div>
        </Modal.Body>
    </Modal>
  )
}

export default ModalPassenger