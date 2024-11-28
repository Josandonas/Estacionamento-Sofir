import React from 'react';
import api from '../../api';


interface CarrosStatusModalProps {
    carro: {
        id: number;
        modelo: string;
        cliente_id: number;
        status: boolean;
        placa: string;
    };
    onClose: () => void;
    onUpdate: () => void;
}

const CarrosStatusModal: React.FC<CarrosStatusModalProps> = ({ carro, onClose, onUpdate }) => {
    const handleStatusChange = async () => {
        // Função que atualiza o status do cliente
        await api.put(`/carros/${carro.id}/status`);
        onUpdate();
        onClose();
    };
    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {carro.status ? 'Desativar' : 'Ativar'} Carro
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
                        <p>Tem certeza que deseja <b style={{textTransform: 'uppercase'}}>{carro.status ? 'desativar' : 'ativar'}</b> o carro do modelo <b style={{textTransform: 'uppercase'}}>{carro.modelo}</b> da placa <b style={{textTransform: 'uppercase'}}>{carro.placa}</b>?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button className="btn btn-danger" onClick={handleStatusChange}>
                            {carro.status ? 'Desativar' : 'Ativar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrosStatusModal;