import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import SideBar from './side-bar';
import { useBoolean } from 'src/hooks/use-boolean';
import { useMediaQuery, useTheme } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));



export default function DashLayout({ children }: { children: React.ReactNode }) {

    const open = useBoolean(true);

    const theme = useTheme();

    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box sx={{ display: 'flex', minHeight: "90vh" }}>
            <CssBaseline />
            <SideBar open={open.value} onClose={open.onFalse} onOpen={open.onTrue} />
            <Main
                open={open.value}
                sx={{
                    ...(!mdUp && {
                        marginLeft: 0
                    }),
                    my: 'auto'
                }}
            >
                {children}
            </Main>
        </Box>
    );
}