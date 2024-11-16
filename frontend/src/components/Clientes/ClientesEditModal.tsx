import React, { useState } from 'react';
import api from '../../api';

interface ClientesEditModalProps {
    cliente: {
        id: number;
        nome: string;
        cpf: string;
        telefone: string;
    };
    onClose: () => void;
    onUpdate: () => void;
}

const ClientesEditModal: React.FC<ClientesEditModalProps> = ({ cliente, onClose, onUpdate }) => {
    const [nome, setNome] = useState(cliente.nome);
    const [cpf, setCpf] = useState(cliente.cpf);
    const [telefone, setTelefone] = useState(cliente.telefone);

    const handleSave = async () => {
        await api.put(`/clientes/${cliente.id}`, { nome, cpf, telefone });
        onUpdate();
        onClose();
    };

    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Cliente</h5>
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
                        <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientesEditModal;