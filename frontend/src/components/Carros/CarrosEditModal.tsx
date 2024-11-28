import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import api from '../../api';
import { validarPlacaBrasileira } from '../../utils/validations'; // Importando a validação de placas

interface CarrosEditModalProps {
    carro: {
        id: number;
        modelo: string;
        placa: string;
        cliente_id: number;
        status: boolean;
    };
    onClose: () => void;
    onUpdate: () => void;
}

const CarrosEditModal: React.FC<CarrosEditModalProps> = ({ carro, onClose, onUpdate }) => {
    const [modelo, setModelo] = useState(carro.modelo);
    const [placa, setPlaca] = useState(carro.placa);
    const [clienteId, setClienteId] = useState<number | null>(carro.cliente_id);
    const [clientes, setClientes] = useState<{ id: number; nome: string; cpf: string }[]>([]);
    const [placaValida, setPlacaValida] = useState<boolean>(true);
    const [placaInternacional, setPlacaInternacional] = useState<boolean>(false);

    // Carregar lista de clientes ao montar o componente
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get('/clientes'); // Supondo que a API retorne clientes
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao carregar clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    // Manipular mudanças no campo de placa
    const handlePlacaChange = (value: string) => {
        setPlaca(value.toUpperCase()); // Convertendo para maiúsculas
        const ehValida = validarPlacaBrasileira(value); // Usando a validação importada
        setPlacaValida(ehValida);
        setPlacaInternacional(!ehValida); // Permite placas internacionais caso inválida
    };

    // Enviar alterações para a API
    const handleSave = async () => {
        if (!clienteId) {
            alert('Selecione um dono para o carro.');
            return;
        }

        if (!placaValida && !placaInternacional) {
            alert('Informe uma placa válida ou marque como internacional.');
            return;
        }

        try {
            await api.put(`/carros/${carro.id}`, {
                modelo,
                placa,
                cliente_id: clienteId,
            });
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar carro:', error);
        }
    };

    // Opções formatadas para o React Select
    const clienteOptions = clientes.map((cliente) => ({
        value: cliente.id,
        label: `${cliente.nome} (${cliente.cpf})`,
    }));

    // Encontrar o dono atual no array de opções
    const donoAtual = clienteOptions.find((option) => option.value === carro.cliente_id);

    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Carro</h5>
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
                        <div className="mb-3">
                            <label htmlFor="modelo" className="form-label">
                                Modelo
                            </label>
                            <input
                                type="text"
                                id="modelo"
                                className="form-control"
                                placeholder="Modelo"
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="placa" className="form-label">
                                Placa
                            </label>
                            <input
                                type="text"
                                id="placa"
                                className={`form-control ${!placaValida && !placaInternacional ? 'is-invalid' : ''}`}
                                placeholder="Placa (Ex: ABC-1234 ou ABC1D23)"
                                value={placa}
                                onChange={(e) => handlePlacaChange(e.target.value)}
                            />
                            {!placaValida && !placaInternacional && (
                                <div className="invalid-feedback">
                                    Placa inválida. Insira uma placa brasileira ou marque como internacional.
                                </div>
                            )}
                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    id="placaInternacional"
                                    className="form-check-input"
                                    checked={placaInternacional}
                                    onChange={(e) => setPlacaInternacional(e.target.checked)}
                                />
                                <label htmlFor="placaInternacional" className="form-check-label">
                                    Placa Internacional
                                </label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cliente" className="form-label">
                                Dono
                            </label>
                            <Select
                                id="cliente"
                                options={clienteOptions}
                                placeholder="Selecione o Dono"
                                defaultValue={donoAtual} // Exibe o dono atual como selecionado
                                onChange={(selectedOption) =>
                                    setClienteId(selectedOption ? selectedOption.value : null)
                                }
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                            disabled={!modelo || !placa || !clienteId}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrosEditModal;