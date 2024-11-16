import React from 'react';
import api from '../../api';

interface ClientesStatusModalProps {
    cliente: {
        id: number;
        nome: string;
        telefone: string;
        status: boolean;
    };
    onClose: () => void;
    onUpdate: () => void;
}

const ClientesStatusModal: React.FC<ClientesStatusModalProps> = ({ cliente, onClose, onUpdate }) => {
    const handleStatusChange = async () => {
        // Função que atualiza o status do cliente
        await api.put(`/clientes/${cliente.id}/status`);
        onUpdate();
        onClose();
    };

    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {cliente.status ? 'Desativar' : 'Ativar'} Cliente
                        </h5>
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
                        <p>Tem certeza que deseja <b style={{textTransform: 'uppercase'}}>{cliente.status ? 'desativar' : 'ativar'}</b> o cliente <b style={{textTransform: 'uppercase'}}>{cliente.nome}</b>?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button className="btn btn-danger" onClick={handleStatusChange}>
                            {cliente.status ? 'Desativar' : 'Ativar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientesStatusModal;