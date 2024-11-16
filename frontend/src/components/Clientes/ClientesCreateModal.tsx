import React, { useState } from 'react';
import api from '../../api';

interface ClientesCreateModalProps {
    onClose: () => void;
    onCreate: () => void;
}

const ClientesCreateModal: React.FC<ClientesCreateModalProps> = ({ onClose, onCreate }) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleCreate = async () => {
        try {
            await api.post('/clientes', { nome, cpf, telefone });
            onCreate();
            onClose();
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
        }
    };

    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Criar Cliente </h5>
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ position: 'absolute', top: '10px', right: '10px'}}
                            onClick={onClose}
                            aria-label="Close"
                        >
                            X
                        </button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button className="btn btn-primary" onClick={handleCreate}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientesCreateModal;