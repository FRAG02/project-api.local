import React from 'react';
import { Box } from "@mui/material"
import SideBar from "./components/shared/SideBar"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import * as pages from './pages'
import navigation from './data/navigation';
import Header from './components/shared/Header';

const __SIDEBAR_WIDTH = 340

const Main = () => {
    return (
        <Router>
            <Box display="flex">
                <SideBar drawerWidth={__SIDEBAR_WIDTH} />
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.default' }}
                    position="relative"
                >
                    <Routes>
                        {navigation.map(({ url, component }) => {
                            const Component = pages[component]
                            return <Route path={url} element={<Component />} />
                        })}
                        <Route path="/mol/edit/:id" element={<pages.MOLForm />} />
                        <Route path="/department/edit/:id" element={<pages.DepartmentForm />} />
                        <Route path="/equipment/edit/:id" element={<pages.EquipmentForm />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default Main;