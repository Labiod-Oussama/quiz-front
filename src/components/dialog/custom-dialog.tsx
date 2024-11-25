import { alpha, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentProps, DialogProps, DialogTitle, DialogTitleProps, IconButton, ListItemText, SxProps, Theme } from '@mui/material'
import React from 'react'
import { ColorSchema } from 'src/theme/palette';
import Iconify from '../iconify/Iconify';

interface dialogProps extends DialogProps {
    children: React.ReactNode;
    onClose: VoidFunction;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    loading?: boolean;
    disableCancel?: boolean;
    titleElement?: React.ReactNode;
    headerColor?: ColorSchema;
    dialogContentProps?: DialogContentProps;
    dialogTitleProps?: DialogTitleProps;
}
export default function CustomDialog(
    {
        open,
        onClose,
        loading = false,
        children,
        title,
        titleElement,
        headerColor,
        maxWidth = 'md',
        disableCancel = true,
        dialogContentProps,
        dialogTitleProps,
        ...other
    }:
        dialogProps
) {
    return (
        <Dialog
            fullWidth
            open={open}
            // onClose={onClose}
            maxWidth={maxWidth}
            {...other}
        >
            <DialogTitle
                variant='h5'
                sx={{
                    position: 'relative',
                    minHeight: 60,
                    ...(headerColor && {
                        bgcolor: (theme) => alpha(theme.palette[headerColor].main, 0.08),
                    })
                }}
                {...dialogTitleProps}
            >
                {
                    titleElement ? titleElement : title
                }

                <IconButton
                    size='large'
                    color='error'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translate(0, -50%)',
                        right: { xs: 3, md: 8 },
                    }}
                >

                    <Iconify icon='gg:close-o' />
                </IconButton>

            </DialogTitle>
            <DialogContent
                sx={{
                    "&::-webkit-scrollbar": {
                        width: 5
                    },

                    "&::-webkit-scrollbar-thumb": {
                        bgcolor: 'text.disabled',
                        borderRadius: 1
                    },
                    py: 2,
                    px: 3,
                }}
                {...dialogContentProps}
            >
                {loading &&
                    <Box textAlign='center'>
                        <CircularProgress />
                    </Box>
                }
                {!loading && children}
            </DialogContent>
            {!disableCancel && (
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            )}
        </Dialog >
    )
}
