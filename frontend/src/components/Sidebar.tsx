import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCar, faTicketAlt, faParking, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <h2 className="text-center mt-3">Dashboard</h2>
            <div className="flex-grow-1 d-flex flex-column align-items-start px-3">
                <Link to="/home/clientes" className="my-2 text-decoration-none text-dark">
                    <FontAwesomeIcon icon={faUser} /> Clientes
                </Link>
                <Link to="/home/carros" className="my-2 text-decoration-none text-dark">
                    <FontAwesomeIcon icon={faCar} /> Carros
                </Link>
                <Link to="/home/tickets" className="my-2 text-decoration-none text-dark">
                    <FontAwesomeIcon icon={faTicketAlt} /> Tickets
                </Link>
                <Link to="/home/vagas" className="my-2 text-decoration-none text-dark">
                    <FontAwesomeIcon icon={faParking} /> Vagas
                </Link>
            </div>
            <div className="px-3 pb-3">
                <button className="btn btn-danger w-100">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Sair
                </button>
            </div>
        </div>
    );
};

export default Sidebar;