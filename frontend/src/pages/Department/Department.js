import React, { useEffect, useState } from 'react';
import { getDepartments, removeDepartments } from '../../services/api';
import Header from '../../components/shared/Header';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import AlertDialog from '../../components/shared/AlertDialog';
import { Link } from 'react-router-dom';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedItem, setSelectedItem] = useState(undefined);

    const handleCloseModal = () => setSelectedItem(undefined);
    const handleAgree = () => {
        removeDepartments(selectedItem).then(() => getDepartments(setDepartments))
    }
    const alertTitle = "Вы точно хотите удалить отдел"
    const alertText = `Отдел ${departments.find(el => el.id === selectedItem)?.название_подразделения} будет удален. Продолжить?`

    useEffect(() => {
        getDepartments(setDepartments)
    }, []);

    return (
        <>
            <Header heading="Подразделения" />
            <AlertDialog open={selectedItem} handleClose={handleCloseModal} title={alertTitle} text={alertText} agreeText="Да" agreeEvent={handleAgree} disagreeText="Нет" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Отдел</TableCell>
                            <TableCell>МОЛ</TableCell>
                            <TableCell>Блок</TableCell>
                            <TableCell>Корпус</TableCell>
                            <TableCell>Этаж</TableCell>
                            <TableCell>Номер Кабинета</TableCell>
                            <TableCell>Название Кабинета</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.название_подразделения}</TableCell>
                                <TableCell>{row.фио_мол}</TableCell>
                                <TableCell>{row.блок}</TableCell>
                                <TableCell>{row.корпус}</TableCell>
                                <TableCell>{row.этаж}</TableCell>
                                <TableCell>{row.номер_кабинета}</TableCell>
                                <TableCell>{row.название_кабинета}</TableCell>
                                <TableCell>
                                    <Button onClick={() => setSelectedItem(row.id)}>Удалить</Button>
                                    <Button as={Link} sx={{ textDecoration: "unset" }} to={`./edit/${row.id}`}>Редактировать</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Department;