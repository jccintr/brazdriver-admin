import React from 'react'
import { Modal } from 'flowbite-react'

const ModalSendPushMessage = ({openModal,setOpenModal,pushToken}) => {
  return (
    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-4">
                
                </div>
            </Modal.Body>
    </Modal>
  )
}

export default ModalSendPushMessage