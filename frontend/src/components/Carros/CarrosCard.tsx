import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import EditModal from './CarrosEditModal';
import StatusModal from './CarrosStatusModal';

interface CarrosCardProps {
    carro: {
        id: number;
        modelo: string;
        placa: string;
        cliente_id: number;
        status: boolean;
    };
    onUpdate: () => void;
}

const CarrosCard: React.FC<CarrosCardProps> = ({ carro, onUpdate }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [dono, setDono] = useState<{ nome: string; cpf: string } | null>(null);

    // Buscar informações do dono do carro (cliente associado ao cliente_id)
    useEffect(() => {
        const fetchDono = async () => {
            try {
                const response = await api.get(`/clientes/${carro.cliente_id}`); // API para buscar cliente pelo ID
                setDono(response.data);
            } catch (error) {
                console.error('Erro ao carregar dono do carro:', error);
            }
        };

        fetchDono();
    }, [carro.cliente_id]);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Modelo: {carro.modelo}</h5>
                <p className="card-text">
                    <strong>Dono:</strong>{' '}
                    {dono ? `${dono.nome} (${dono.cpf})` : 'Carregando...'}
                </p>
                <p className="card-text">
                    <strong>Placa:</strong> {carro.placa}
                </p>
                <p className="card-text">
                    <strong>Status:</strong> {carro.status ? 'Ativo' : 'Inativo'}
                </p>
                <button
                    className="btn btn-primary me-2"
                    onClick={() => setShowEditModal(true)}
                >
                    <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button
                    className={`btn ${carro.status ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => setShowStatusModal(true)}
                >
                    <FontAwesomeIcon icon={carro.status ? faToggleOff : faToggleOn} />{' '}
                    {carro.status ? 'Desativar' : 'Ativar'}
                </button>
            </div>

            {showEditModal && (
                <EditModal
                    carro={carro}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={onUpdate}
                />
            )}
            {showStatusModal && (
                <StatusModal
                    carro={carro}
                    onClose={() => setShowStatusModal(false)}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
};

export default CarrosCard;