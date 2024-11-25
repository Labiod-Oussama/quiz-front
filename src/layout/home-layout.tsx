import Box from '@mui/material/Box';
import Header from './header';
import { usePathname } from 'src/hooks/use-pathname';



// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};


// this layout is for the main page in the landing page
export default function MainLayout({ children }: Props) {
    const pathname = usePathname();

    const homePage = pathname === '/';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
            <Header />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ...(!homePage && {
                        pt: { xs: 8, md: 10 },
                    }),
                }}
            >

                {children}
            </Box>

        </Box>
    );
}
