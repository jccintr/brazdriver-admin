import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Label, Button, Spinner } from 'flowbite-react';

const ModalEditLocalidade = ({ 
    openModal, 
    setOpenModal, 
    localidade, 
    bairroId, 
    nomeBairro, 
    onSubmit, 
    onDelete,     // ← Nova prop
    isLoading 
}) => {
    const [formData, setFormData] = useState({ 
        nome: '', 
        latitude: '', 
        longitude: '', 
        valor: ''  
    });
    const [error, setError] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    // Preenche o formulário quando o modal abre
    useEffect(() => {
        if (openModal && localidade) {
            setFormData({
                nome: localidade.nome || '',
                latitude: localidade.latitude || '',
                longitude: localidade.longitude || '',
                valor: localidade.valor || ''
            });
            setError('');
            setShowConfirmDelete(false);
        }
    }, [openModal, localidade]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.nome || !formData.latitude || !formData.longitude || !formData.valor) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        onSubmit({
            ...formData,
            valor: parseFloat(formData.valor)
        });
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
        setShowConfirmDelete(false);
        setOpenModal(false);
    };

    const handleClose = () => {
        setShowConfirmDelete(false);
        setOpenModal(false);
    };

    return (
        <Modal show={openModal} size="md" popup onClose={handleClose}>
            <Modal.Header>Editar Localidade ({nomeBairro})</Modal.Header>
            <Modal.Body>
                {!showConfirmDelete ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="nome" value="Nome da Localidade *" />
                            <TextInput
                                id="nome"
                                name="nome"
                                placeholder="Ex: Praça da Matriz"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="latitude" value="Latitude *" />
                                <TextInput
                                    id="latitude"
                                    name="latitude"
                                    placeholder="-19.912998"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="longitude" value="Longitude *" />
                                <TextInput
                                    id="longitude"
                                    name="longitude"
                                    placeholder="-43.926481"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="valor" value="Valor (R$) *" />
                            <TextInput
                                id="valor"
                                name="valor"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                value={formData.valor}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <div className="flex justify-between pt-6">
                            <Button 
                                color="failure" 
                                onClick={() => setShowConfirmDelete(true)}
                                disabled={isLoading}
                            >
                                Excluir
                            </Button>

                            <div className="flex gap-3">
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
                        </div>
                    </form>
                ) : (
                    // Confirmação de exclusão
                    <div className="space-y-6 py-4">
                        <div className="text-center">
                            <p className="text-red-600 text-lg font-semibold">Tem certeza que deseja excluir esta localidade?</p>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                {localidade?.nome}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Esta ação não pode ser desfeita.</p>
                        </div>

                        <div className="flex justify-center gap-4">
                            <Button color="gray" onClick={() => setShowConfirmDelete(false)}>
                                Cancelar
                            </Button>
                            <Button color="failure" onClick={handleDelete}>
                                Sim, Excluir
                            </Button>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ModalEditLocalidade;