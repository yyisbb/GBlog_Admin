import PropTypes from 'prop-types';
import { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// assets
import { LogoutOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
    const [selectedIndex] = useState(0);

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
            <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
