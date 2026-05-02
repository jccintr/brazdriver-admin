import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Label, Button, Spinner } from 'flowbite-react';

const ModalEditBairro = ({ 
    openModal, 
    setOpenModal, 
    bairro, 
    onSubmit,
    isLoading 
}) => {
    const [formData, setFormData] = useState({
        nome: ''
    });
    const [error, setError] = useState('');

    // Preenche o formulário quando o modal abre
    useEffect(() => {
        if (openModal && bairro) {
            setFormData({
                nome: bairro.nome || ''
            });
            setError('');
        }
    }, [openModal, bairro]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.nome.trim()) {
            setError('O nome do bairro é obrigatório.');
            return;
        }

        onSubmit({
            nome: formData.nome.trim()
        });
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal show={openModal} size="md" popup onClose={handleClose}>
            <Modal.Header>Editar Bairro</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="nome" value="Nome do Bairro *" className="mb-1" />
                        <TextInput
                            id="nome"
                            name="nome"
                            placeholder="Ex: Anhumas"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button 
                            color="gray" 
                            onClick={handleClose} 
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            color="blue" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner size="sm" className="mr-2" />
                                    Salvando...
                                </>
                            ) : 'Salvar'}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEditBairro;