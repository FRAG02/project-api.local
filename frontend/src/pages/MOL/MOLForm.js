import React, { useEffect, useState } from 'react';
import Header from '../../components/shared/Header';
import { Box, Button, Grid2, TextField } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createUpdMOLs, getMOLsById } from '../../services/api';

const MOLForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formState, setFormState] = useState({})

    useEffect(() => {
        if (id) {
            getMOLsById(setFormState, id)
        }
    }, [id])

    const onChangeHandle = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const createUpdateHandle = () => {
        createUpdMOLs(id, formState).then(navigate(-1))
    }


    return (
        <>
            <Header heading={id ? "Редактировать МОЛ" : "Добавить МОЛ"} />
            <Box p={3}>
                <Grid2>
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.фио_мол } }} onChange={onChangeHandle} value={formState?.фио_мол} name="фио_мол" label="ФИО" placeholder='ФИО' />
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.должность } }} onChange={onChangeHandle} value={formState?.должность} name="должность" label="Должность" placeholder='Должность' />
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.название_подразделения } }} onChange={onChangeHandle} value={formState?.название_подразделения} name="название_подразделения" label="Отдел" placeholder='Отдел' />
                </Grid2>
                <Button as={Link} sx={{ textDecoration: "unset" }} to={-1}>Назад</Button>
                <Button onClick={createUpdateHandle}>{id ? "Обновить" : "Добавить"}</Button>
            </Box>
        </>
    );
};

export default MOLForm;