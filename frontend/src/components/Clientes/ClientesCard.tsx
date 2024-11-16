import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import EditModal from './ClientesEditModal';
import StatusModal from './ClientesStatusModal';

interface ClientesCardProps {
    cliente: {
        id: number;
        nome: string;
        cpf: string;
        telefone: string;
        status: boolean;
    };
    onUpdate: () => void;
}

const ClientesCard: React.FC<ClientesCardProps> = ({ cliente, onUpdate }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Nome: {cliente.nome}</h5>
                <p className="card-text"><strong>ID:</strong> {cliente.id}</p>
                <p className="card-text"><strong>CPF:</strong> {cliente.cpf}</p>
                <p className="card-text"><strong>Telefone:</strong> {cliente.telefone}</p>
                <p className="card-text"><strong>Status:</strong> {cliente.status ? 'Ativo' : 'Inativo'}</p>
                <button
                    className="btn btn-primary me-2"
                    onClick={() => setShowEditModal(true)}
                >
                    <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button
                    className={`btn ${cliente.status ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => setShowStatusModal(true)}
                >
                    <FontAwesomeIcon icon={cliente.status ? faToggleOff : faToggleOn} />{' '}
                    {cliente.status ? 'Desativar' : 'Ativar'}
                </button>
            </div>

            {showEditModal && (
                <EditModal
                    cliente={cliente}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={onUpdate}
                />
            )}
            {showStatusModal && (
                <StatusModal
                    cliente={cliente}
                    onClose={() => setShowStatusModal(false)}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
};

export default ClientesCard;