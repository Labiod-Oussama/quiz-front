import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify/Iconify';
import { Avatar } from '@mui/material';
import { useActiveLink } from 'src/hooks/use-active-link';
import { useAuthContext } from 'src/context/use-auth-context';

// ----------------------------------------------------------------------


export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const navConfig = [
  {
    title: 'الرئيسية',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/#Home',
  },
  {
    title: 'معلومات عنا',
    icon: <Iconify icon="material-symbols:info" />,
    path: '/#About_us',
  },
]

export default function Header() {


  const theme = useTheme();

  const { authenticated } = useAuthContext();



  return (
    <AppBar sx={{ bgcolor: "whitesmoke", color: "black" }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>

          <Link href={paths.home}>
            <Avatar
              src='/assets/logo-quiz.png'
              variant='rounded'
              alt='logo'
              sx={{ width: { xs: 40, sm: 60 }, height: { xs: 40, sm: 60 } }}
            />
          </Link>

          <Stack
            component='nav'
            direction={'row'}
            spacing={{ xs: 2, md: 3 }}
            flexGrow={1}
            justifyContent='center'
          >
            {navConfig.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: .5,
                  color: useActiveLink(item.path) ? 'error.main' : 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'error.main',
                  },
                }}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </Stack>


          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }} sx={{ ml: 2 }}>
            <Button
              variant="contained"
              color='error'
              sx={{
                height: 37,
              }}
              endIcon={
                authenticated
                  ? <Iconify icon='mdi:monitor-dashboard' />
                  : <Iconify icon="solar:login-3-line-duotone" />
              }
              href={paths.dashboard.index}
            >
              {
                authenticated ? 'لوحة التحكم' : 'تسجيل الدخول'
              }
            </Button>
          </Stack>
        </Container>
      </Toolbar>

    </AppBar >
  );
}
