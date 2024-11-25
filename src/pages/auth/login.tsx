import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Link,
    Grid,
    Paper,
    Avatar,
    Alert,
    InputAdornment,
    IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { paths } from 'src/routes/paths';
import { useState } from 'react';
import { errorProcess } from 'src/utils/error-process';
import FormProvider from 'src/components/hook-form/form-provider';
import { useRouter } from 'src/hooks/use-router';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuthContext } from 'src/context/use-auth-context';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify/Iconify';

const schema = yup.object().shape({
    email: yup.string().email('بريد الكتروني غير صالح').required('بريد الكتروني اجباري'),
    password: yup.string().required('كلمة المرور اجبارية'),
});


export default function LoginPage() {
    const { login } = useAuthContext();

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const password = useBoolean();

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = methods


    const onSubmit = handleSubmit(async (data) => {
        const { email, password } = data;
        setError(null)
        try {
            await login?.(email, password);
            router.push(paths.dashboard.index);
        } catch (error: any) {
            console.error(error);
            const errMsg = errorProcess(error)
            setError(errMsg)
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    تسجيل الدخول
                </Typography>
                <br />
                {
                    error && (
                        <Alert
                            variant='standard'
                            severity='error'
                            sx={{
                                width: "100%",
                                mb: 1.5
                            }}
                        >
                            {error}
                        </Alert>
                    )
                }
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        id="email"
                                        label="البريد الإلكتروني"
                                        autoFocus
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        name="password"
                                        label="كلمة المرور"
                                        type={password.value ? "text" : "password"}
                                        id="password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={password.onToggle} edge="end">
                                                        <Iconify
                                                            icon={
                                                                password.value
                                                                    ? "solar:eye-bold"
                                                                    : "solar:eye-closed-bold"
                                                            }
                                                        />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={isSubmitting}
                    >
                        تسجيل الدخول

                    </LoadingButton>
                    <Box textAlign='center'>
                        <Link href={paths.auth.register} variant="body2">
                            ليس لديك حساب؟ سجل الآن
                        </Link>
                    </Box>
                </FormProvider>
            </Paper>
        </Container>
    );
}