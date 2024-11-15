import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Clientes from './components/Clientes';
import Carros from './components/Carros';
import Tickets from './components/Tickets';
import Vagas from './components/Vagas';
import ProtectRoute from './components/ProtectRoute';
import PublicRoute from './components/PublicRoute';

const BackgroundWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundImage: isLoginPage ? `url('/src/assets/background_parking.png')` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: isLoginPage ? 'flex' : 'block',
                justifyContent: isLoginPage ? 'center' : 'initial',
                alignItems: isLoginPage ? 'center' : 'initial',
                width: '100vw',
            }}
        >
            {children}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <BackgroundWrapper>
                <Routes>
                    {/* Redireciona a rota raiz ("/") para "/login" */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    
                    {/* Rota pública para login - redireciona para /home se o usuário já estiver autenticado */}
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />

                    {/* Rota protegida para a dashboard - redireciona para /login se não estiver autenticado */}
                    <Route path="/home" element={
                        <ProtectRoute>
                            <Dashboard />
                        </ProtectRoute>
                    }>
                        <Route path="clientes" element={<Clientes />} />
                        <Route path="carros" element={<Carros />} />
                        <Route path="tickets" element={<Tickets />} />
                        <Route path="vagas" element={<Vagas />} />
                    </Route>
                </Routes>
            </BackgroundWrapper>
        </Router>
    );
};

export default App;