import React, { useEffect, useState } from 'react';
import { getEquipment, removeEquipment } from '../../services/api';
import Header from '../../components/shared/Header';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import AlertDialog from '../../components/shared/AlertDialog';
import { Link } from 'react-router-dom';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [selectedItem, setSelectedItem] = useState(undefined);

    const handleCloseModal = () => setSelectedItem(undefined);
    const handleAgree = () => {
        removeEquipment(selectedItem).then(() => getEquipment(setEquipment)())
    }
    const alertTitle = "Вы точно хотите удалить отдел"
    const alertText = `Оборудование ${equipment.find(el => el.id === selectedItem)?.название_оборудования} будет удален. Продолжить?`

    useEffect(() => {
        getEquipment(setEquipment)
    }, []);

    return (
        <>
            <Header heading="Оборудование" />
            <AlertDialog open={selectedItem} handleClose={handleCloseModal} title={alertTitle} text={alertText} agreeText="Да" agreeEvent={handleAgree} disagreeText="Нет" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Оборудование</TableCell>
                            <TableCell>подразделение</TableCell>
                            <TableCell>Дата Производства</TableCell>
                            <TableCell>Дата поступления</TableCell>
                            <TableCell>Дата ввода в эксплуатацию</TableCell>
                            <TableCell>Дата вывода из эксплуатации</TableCell>
                            <TableCell>Стоимость</TableCell>
                            <TableCell>Заводской номер</TableCell>
                            <TableCell>Инвентарный номер</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {equipment.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.название_оборудования}</TableCell>
                                <TableCell>{row.название_подразделения}</TableCell>
                                <TableCell>{row.дата_производства}</TableCell>
                                <TableCell>{row.дата_поступления}</TableCell>
                                <TableCell>{row.дата_ввода_в_эксплуатацию}</TableCell>
                                <TableCell>{row.дата_вывода_из_эксплуатации}</TableCell>
                                <TableCell>{row.стоимость}</TableCell>
                                <TableCell>{row.заводской_номер}</TableCell>
                                <TableCell>{row.инвентарный_номер}</TableCell>
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

export default Equipment;