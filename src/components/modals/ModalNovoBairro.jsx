import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Label, Button, Spinner } from 'flowbite-react';

const ModalNovoBairro = ({ openModal,setOpenModal,onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({nomeBairro: '', nomeLocalidade: '', latitude: '', longitude: '', valor: '' });
    const [error, setError] = useState('');

    // Resetar formulário quando o modal abrir
    useEffect(() => {
        if (openModal) {
            setFormData({
                nomeBairro: '',
                nomeLocalidade: '',
                latitude: '',
                longitude: '',
                valor: ''
            });
            setError('');
        }
    }, [openModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.nomeBairro || !formData.nomeLocalidade || 
            !formData.latitude || !formData.longitude || !formData.valor) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        const payload = {
            nome: formData.nomeBairro,
            localidades: [{
                nome: formData.nomeLocalidade,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                valor: parseFloat(formData.valor)
            }]
        };

        onSubmit(payload);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal show={openModal} size="md" popup onClose={handleClose}>
            <Modal.Header>Novo Bairro</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Nome do Bairro */}
                    <div>
                        <Label htmlFor="nomeBairro" value="Nome do Bairro *" className="mb-1" />
                        <TextInput
                            id="nomeBairro"
                            name="nomeBairro"
                            placeholder="Ex: Anhumas"
                            value={formData.nomeBairro}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                            Primeira Localidade
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="nomeLocalidade" value="Nome da Localidade *" />
                                <TextInput
                                    id="nomeLocalidade"
                                    name="nomeLocalidade"
                                    placeholder="Ex: Entrada da Estrada"
                                    value={formData.nomeLocalidade}
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
                                        placeholder="-22.45513"
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
                                        placeholder="-45.66068"
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
                                    placeholder="25.00"
                                    value={formData.valor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
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
                                    Criando Bairro...
                                </>
                            ) : 'Criar Bairro'}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalNovoBairro;