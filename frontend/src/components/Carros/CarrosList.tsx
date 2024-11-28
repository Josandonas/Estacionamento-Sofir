import React, {useEffect, useState} from 'react';
import CarrosCard from './CarrosCard';
import CarrosCreateModal from './CarrosCreatModal';
import api from '../../api';

interface Carro {
    id: number;
    modelo: string;
    placa: string;
    cliente_id: number;
    status: boolean;
}

const CarrosList: React.FC = () => {
    const [carros, setCarros] = useState<Carro[]>([]);
    const [ShowCreateModal, setShowCreateModal] = useState(false);
    
    useEffect(()=>{
        fetchCarros();
    }, []);

    const fetchCarros = async () => {
        const response = await api.get('/carros');
        setCarros(response.data);
    };
    const handleCreate = ()=>{
        fetchCarros();
    };
    return(
        <div className="container">
            <h1>Carros</h1>
            <button className="btn btn-success mb-3" onClick={() => setShowCreateModal(true)}>
                Criar Carro
            </button>
            <div className="row">
                {carros.map(carro => (
                    <div key={carro.id} className="col-md-4">
                        <CarrosCard carro={carro} onUpdate={fetchCarros} />
                    </div>
                ))}
            </div>

            {ShowCreateModal && (
                <CarrosCreateModal onClose={() => setShowCreateModal(false)} onCreate={handleCreate} />
            )}
        </div>
    );
}
export default CarrosList;