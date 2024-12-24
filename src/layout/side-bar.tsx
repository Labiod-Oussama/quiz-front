import { alpha, Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Iconify from 'src/components/iconify/Iconify';
import { useActiveLink } from 'src/hooks/use-active-link';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/routes/paths';


const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SideBar({
    open,
    onOpen,
    onClose
}: {
    open?: boolean;
    onOpen?: VoidFunction;
    onClose?: VoidFunction;
}) {
    const router = useRouter();
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <>
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    bgcolor: (theme) => theme.palette.error.dark,
                }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {
                        mdUp &&
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                        >
                            <Iconify icon="hugeicons:dashboard-square-edit" />
                            <Typography variant="h5" component="div">
                                النسخة الالكترونية لاختبار الفحص المختصر للحالة العقلية (MMSE)                                {/* {" ("}
                                {
                                    ['زهايمر', 'خرف', 'باركنسون', 'تصلب لويحي'].map((item, index) => {
                                        return <span key={index}>{" "}{item}{' '}{index !== 3 && '-'}{' '}</span>
                                    })
                                }
                                {")"} */}
                            </Typography>
                        </Stack>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                SlideProps={{
                    direction: theme.direction === "rtl" ? 'right' : 'left',
                }}
                variant={mdUp ? 'persistent' : 'temporary'}
                anchor="left"
                open={open}
            >
                <DrawerHeader
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Avatar
                        src='/assets/logo-quiz.png'
                        variant='square'

                        sx={{
                            ml: 2,
                            width: 45,
                            height: 45,
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            router.push(paths.home)
                        }}
                    />
                    <IconButton onClick={onClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {
                        [
                            {
                                title: 'الاختبار',
                                path: '/dashboard',
                                icon: 'material-symbols-light:quiz'
                            },
                            {
                                title: "المرضى",
                                path: '/patient',
                                icon: 'fluent:people-12-filled'
                            },
                            {
                                title: "النتائج",
                                path: '/results',
                                icon: 'stash:search-results'
                            }
                        ].map((text, index) => (
                            <ListItem
                                key={text.title || index}
                                disablePadding
                                sx={{
                                    color: useActiveLink(text.path) ? 'error.main' : 'inherit',
                                    bgcolor: useActiveLink(text.path) ? (theme) => alpha(theme.palette.error.main, 0.08) : "inherit",
                                    '&:hover': {
                                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
                                    }
                                }}
                                onClick={() => {
                                    router.push(text.path)
                                }}

                            >
                                <ListItemButton >
                                    <ListItemIcon
                                        sx={{
                                            color: useActiveLink(text.path) ? 'error.main' : 'inherit'
                                        }}
                                    >
                                        <Iconify icon={text.icon} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text.title}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Drawer>
        </>
    )
}
