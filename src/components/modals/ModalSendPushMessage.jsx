import React, { useState, useContext } from 'react';
import { Modal, TextInput, Textarea, Button, Label } from 'flowbite-react';
import { HiPaperAirplane } from "react-icons/hi2";
import DataContext from '../../context/DataContext';
import Api from '../../api/Api';

const ModalSendPushMessage = ({ openModal, setOpenModal, driver }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {loggedUser} = useContext(DataContext);

    const handleSend = async () => {
        if (!subject.trim() || !message.trim()) {
            alert("Por favor, informe o assunto e a mensagem.");
            return;
        }

        setIsLoading(true);

        try {
          
           await Api.sendMessageToDriver(loggedUser.token, {
                driverId: driver._id,
                title: subject,
                body: message
            });

            // Limpa os campos após envio
            setSubject('');
            setMessage('');
            setOpenModal(false);

            // Opcional: mostrar toast de sucesso
            // toast.success("Notificação enviada com sucesso!");

        } catch (error) {
            console.error("Erro ao enviar notificação:", error);
            alert("Erro ao enviar notificação. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSubject('');
        setMessage('');
        setOpenModal(false);
    };

    return (
        <Modal show={openModal} size="lg" popup onClose={handleClose}>
            <Modal.Header>
                Enviar Notificação Push
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    {driver.name && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Motorista: <span className="font-medium">{driver.name}</span>
                        </p>
                    )}

                    <div>
                        <Label htmlFor="subject" value="Assunto" className="mb-2 block" />
                        <TextInput
                            id="subject"
                            placeholder="Digite o assunto da notificação"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="message" value="Mensagem" className="mb-2 block" />
                        <Textarea
                            id="message"
                            placeholder="Digite a mensagem que será enviada ao motorista..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            required
                        />
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <div className="flex justify-end gap-3 w-full">
                    <Button 
                        color="gray" 
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        color="blue" 
                        onClick={handleSend}
                        disabled={isLoading || !subject.trim() || !message.trim()}
                        isProcessing={isLoading}
                    >
                        <HiPaperAirplane className="mr-2 h-5 w-5" />
                        Enviar Notificação
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSendPushMessage;