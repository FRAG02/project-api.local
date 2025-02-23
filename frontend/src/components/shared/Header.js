import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useUser } from '../../context/userContext';

const Header = ({ heading }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { logout } = useUser(

    )
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" noWrap component="div">
                    {heading}
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: "#880039" }}>U</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={() => {
                            logout()
                            handleCloseUserMenu()
                        }}>
                            <Typography sx={{ textAlign: 'center' }}>Выйти</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>)
}
export default Header