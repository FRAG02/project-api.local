import React, { useEffect, useState } from 'react';
import Header from '../../components/shared/Header';
import { Box, Button, Grid2, MenuItem, TextField } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createUpdDepartments, getDepartmentsById, getMOLs } from '../../services/api';

const DepartmentForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formState, setFormState] = useState({})
    const [mols, setMOLs] = useState([]);

    useEffect(() => {
        getMOLs(setMOLs)
    }, []);

    useEffect(() => {
        if (id) {
            getDepartmentsById(setFormState, id)
        }
    }, [id])



    const onChangeHandle = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const createUpdateHandle = () => {
        createUpdDepartments(id, formState).then(navigate(-1))
    }


    return (
        <>
            <Header heading={id ? "Редактировать Отдел" : "Добавить Отдел"} />
            <Box p={3}>
                <Grid2>
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.название_подразделения } }} value={formState?.название_подразделения} onChange={onChangeHandle} name="название_подразделения" label="название_подразделения" placeholder='Название отдела' />
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.мол_id } }} value={formState?.мол_id} onChange={onChangeHandle} name="мол_id" label="мол_id" placeholder='МОЛ' select>
                        {mols.map((el) => {
                            return <MenuItem key={el.id} value={el.id}>
                                {el.фио_мол}
                            </MenuItem>
                        })}
                    </TextField>
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.блок } }} value={formState?.блок} onChange={onChangeHandle} name="блок" label="блок" placeholder='Блок' />
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.корпус } }} value={formState?.корпус} onChange={onChangeHandle} name="корпус" label="корпус" placeholder='Корпус' />
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.этаж } }} value={formState?.этаж} onChange={onChangeHandle} name="этаж" label="этаж" placeholder='Этаж' />
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.номер_кабинета } }} value={formState?.номер_кабинета} onChange={onChangeHandle} name="номер_кабинета" label="номер_кабинета" placeholder='Номер кабинета' />
                    <TextField slotProps={{ inputLabel: { shrink: !!formState?.название_кабинета } }} value={formState?.название_кабинета} onChange={onChangeHandle} name="название_кабинета" label="название_кабинета" placeholder='Название кабинета' />
                </Grid2>
                <Button as={Link} sx={{ textDecoration: "unset" }} to={-1}>Назад</Button>
                <Button onClick={createUpdateHandle}>{id ? "Обновить" : "Добавить"}</Button>
            </Box>
        </>
    );
};

export default DepartmentForm;