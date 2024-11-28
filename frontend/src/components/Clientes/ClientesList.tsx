import React, { useEffect, useState } from 'react';
import ClientesCard from './ClientesCard';
import ClientesCreateModal from './ClientesCreateModal';
import api from '../../api';

interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    status: boolean;
}

const ClientesList: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const response = await api.get('/clientes');
        setClientes(response.data);
    };

    const handleCreate = () => {
        fetchClientes();
    };

    return (
        <div className="container">
            <h1>Clientes</h1>
            <button className="btn btn-success mb-3" onClick={() => setShowCreateModal(true)}>
                Criar Cliente
            </button>
            <div className="row">
                {clientes.map(cliente => (
                    <div key={cliente.id} className="col-md-4">
                        <ClientesCard cliente={cliente} onUpdate={fetchClientes} />
                    </div>
                ))}
            </div>

            {showCreateModal && (
                <ClientesCreateModal onClose={() => setShowCreateModal(false)} onCreate={handleCreate} />
            )}
        </div>
    );
};

export default ClientesList;