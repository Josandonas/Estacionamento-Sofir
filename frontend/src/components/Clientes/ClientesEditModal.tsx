import React, { useState } from 'react';
import api from '../../api';
import { formatCpf, formatPhone } from '../../utils/formattings';
import { isValidCpf, isValidPhone } from '../../utils/validations';

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
    const [errors, setErrors] = useState<{ cpf?: string; telefone?: string }>({});

    const handleCpfChange = (value: string) => {
        const formattedCpf = formatCpf(value);
        setCpf(formattedCpf);
        setErrors((prev) => ({
            ...prev,
            cpf: isValidCpf(formattedCpf) ? undefined : 'CPF inválido.',
        }));
    };

    const handlePhoneChange = (value: string) => {
        const formattedPhone = formatPhone(value);
        setTelefone(formattedPhone);
        setErrors((prev) => ({
            ...prev,
            telefone: isValidPhone(formattedPhone) ? undefined : 'Número de telefone inválido.',
        }));
    };

    const handleSave = async () => {
        if (errors.cpf || errors.telefone) {
            alert('Corrija os erros antes de salvar.');
            return;
        }

        try {
            await api.put(`/clientes/${cliente.id}`, { nome, cpf, telefone });
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
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
                            style={{ position: 'absolute', top: '10px', right: '10px' }}
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
                            className={`form-control mb-2 ${errors.cpf ? 'is-invalid' : ''}`}
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => handleCpfChange(e.target.value)}
                        />
                        {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
                        <input
                            type="text"
                            className={`form-control mb-2 ${errors.telefone ? 'is-invalid' : ''}`}
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                        />
                        {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientesEditModal;