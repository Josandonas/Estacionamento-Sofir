import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectRouteProps {
    children: React.ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
    // Verifica se o token existe no localStorage ou sessionStorage
    const isAuthenticated = Boolean(localStorage.getItem('token') || sessionStorage.getItem('token'));

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectRoute;