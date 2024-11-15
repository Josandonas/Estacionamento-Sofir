import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const [user, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate(); 

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Envia o valor de 'remember' junto com o usuário e senha
            const response = await axios.post('http://localhost:8000/api/login', { user, password, remember });
            
            // Armazena o token no localStorage ou sessionStorage com base na seleção de "Lembrar-me"
            if (remember) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }

            navigate('/home');
        } catch (err) {
            setError('Credenciais incorretas. Tente novamente.');
        }
    };

    return (
        <div className="card p-4 text-center" style={{ width: '100%', maxWidth: '400px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleLogin} className="d-flex flex-column">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nome de Usuário"
                    className="form-control mb-3"
                />
                <div className="input-group mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        className="form-control"
                    />
                    <span
                        className="input-group-text"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Ocultar Senha" : "Mostrar Senha"}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                <div className="form-check d-flex align-items-center mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label className="form-check-label ms-2" htmlFor="remember">Lembrar-me</label>
                </div>
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default Login;