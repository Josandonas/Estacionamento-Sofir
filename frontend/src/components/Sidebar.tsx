import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCar, faTicketAlt, faParking, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="bg-light border-end vh-100 p-3" style={{ width: '250px' }}>
            <h2 className="text-center mb-4">Dashboard</h2>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <Link to="/home/clientes" className="nav-link">
                        <FontAwesomeIcon icon={faUsers} className="me-2" /> Clientes
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/home/carros" className="nav-link">
                        <FontAwesomeIcon icon={faCar} className="me-2" /> Carros
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/home/tickets" className="nav-link">
                        <FontAwesomeIcon icon={faTicketAlt} className="me-2" /> Tickets
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/home/vagas" className="nav-link">
                        <FontAwesomeIcon icon={faParking} className="me-2" /> Vagas
                    </Link>
                </li>
            </ul>
            <div style={{ position: 'absolute', bottom: '20px', width: '20%' }}>
                <button className="btn btn-danger w-100" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sair
                </button>
            </div>
        </div>
    );
};

export default Sidebar;