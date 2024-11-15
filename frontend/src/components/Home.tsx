import React, { useEffect, useState } from 'react';
import api from '../api';
import Dash from './Dashboard';

interface User {
    username: string;
    [key: string]: any;
}

const Home: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        api.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => setUser(response.data))
            .catch((error) => {
                console.error("Erro ao buscar usuário:", error);
                setUser(null);
            });
    }, []);

    return (
        <div>
            <Dash />
        </div>
    );
};

export default Home;