// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
            {!matchesXs && <Profile />}
        </>
    );
};

export default HeaderContent;
