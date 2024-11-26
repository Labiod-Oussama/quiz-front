import { useState, useEffect } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

export default function SplashScreen({ sx, ...other }: BoxProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Box
            sx={{
                right: 0,
                width: 1,
                bottom: 0,
                height: 1,
                zIndex: 9998,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                ...sx,
            }}
            {...other}
        >
            <CircularProgress
                size={40}
                color='error'
            />
        </Box>
    );
}
