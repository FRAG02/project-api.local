import React, { useState } from 'react';
import { login } from '../services/api';
import { Stack, TextField, Box, Button } from '@mui/material';

const Login = ({ onLogin, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login data:', { username, password }); // Логируем данные
        try {
            const response = await login(username, password);
            console.log('Login response:', response); 
            if (response.success) {
                onLogin();
            } else {
                alert(response.message || 'Ошибка авторизации');
            }
        } catch (error) {
            console.error('Login error:', error); // Логируем ошибку
            alert('Ошибка при выполнении запроса');
        }
    };

    return (
        <Stack height="100vh" justifyContent="center" alignItems="center">
            <Stack spacing="10px" padding="40px" borderRadius="8px" boxShadow='0px 1px 10px 5px rgba(34, 60, 80, 0.2)'>
                <Stack spacing="10px">
                    <TextField
                        style={{ width: "400px" }}
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        style={{ width: "400px" }}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Stack>
                <Box display="flex" justifyContent="center">
                    <Button
                        style={{ width: "200px" }}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Войти
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Button
                        style={{ width: "200px" }}
                        variant="outlined"
                        onClick={onSwitchToRegister}
                    >
                        Зарегистрироваться
                    </Button>
                </Box>
            </Stack>
        </Stack>
    );
};

export default Login;
