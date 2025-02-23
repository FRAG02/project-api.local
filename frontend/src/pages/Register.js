import React, { useState } from 'react';
import { register } from '../services/api';
import { Stack, TextField, Box, Button } from '@mui/material';

const Register = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Register data:', { username, password }); // Логируем данные
        try {
            const response = await register(username, password);
            console.log('Register response:', response); // Логируем ответ
            if (response.success) {
                alert(response.message);
                onSwitchToLogin();
            } else {
                alert(response.message || 'Ошибка регистрации');
            }
        } catch (error) {
            console.error('Register error:', error); // Логируем ошибку
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
                        Зарегистрироваться
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Button
                        style={{ width: "200px" }}
                        variant="outlined"
                        onClick={onSwitchToLogin}
                    >
                        Войти
                    </Button>
                </Box>
            </Stack>
        </Stack>
    );
};

export default Register;