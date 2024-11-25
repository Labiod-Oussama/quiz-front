import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


// system
import { palette } from './palette';
import { typography } from './typography';
import RTL from './right-to-left';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {

    const memoizedValue = useMemo(
        () => ({
            palette: {
                ...palette('light'),
            },
            shape: { borderRadius: 8 },
            typography,
        }),
        []
    );

    const theme = createTheme(memoizedValue as ThemeOptions);

    return (
        <MuiThemeProvider theme={theme}>
            <RTL themeDirection='rtl'>
                <CssBaseline />
                {children}
            </RTL>
        </MuiThemeProvider>
    );
}
