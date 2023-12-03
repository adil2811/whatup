'use client'
import { useState, useContext } from 'react';

import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, styled } from '@mui/material';
import { signOut } from 'next-auth/react';


//components

const MenuOption = styled(MenuItem)`
    font-size: 40px
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`;
const MenuIcon = styled(MoreVert)`
    font-size: 40px;
    cursor: pointer;
    
`;


const HeaderMenu = () => {
    
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    


    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };


    const toggleDrawer = () => {
        setOpenDrawer(true);
    }



    return (
        <>
            <MenuIcon  onClick={handleClick} />
            <Menu
                anchorEl={open}
                keepMounted
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuOption onClick={() => { handleClose(); toggleDrawer()}}>Profile</MenuOption>
                <MenuOption onClick={signOut}>Logout</MenuOption>
                <MenuOption onClick={() => { handleClose(); }}>
                {/* { showlogoutButton ?
                    <Logout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={onSignoutSuccess}
                    >
                    </Logout> : null
                } */}
                </MenuOption>
            </Menu>
        </>
    )
}

export default HeaderMenu;