import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem('token') || sessionStorage.getItem('token'));

    return isAuthenticated ? <Navigate to="/home" /> : <>{children}</>;
};

export default PublicRoute;