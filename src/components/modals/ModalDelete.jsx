import React from 'react'
import {Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ModalDelete = ({onDeleteAction,openModal,setOpenModal}) => {
  return (
    <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup>
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Deseja realmente excluir este registro?
        </h3>
        <div className="flex justify-center gap-4">
          <Button size='sm' color="failure" onClick={() => onDeleteAction()}>SIM</Button>
          <Button size='sm' color="gray" onClick={() => setOpenModal(false)}>NÃO</Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default ModalDelete