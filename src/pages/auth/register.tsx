import { useForm, Controller, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Container,
    TextField,
    Typography,
    Link,
    Grid,
    Paper,
    Avatar,
    InputAdornment,
    IconButton,
    Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { paths } from 'src/routes/paths';
import { useState } from 'react';
import { errorProcess } from 'src/utils/error-process';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuthContext } from 'src/context/use-auth-context';
import FormProvider from 'src/components/hook-form/form-provider';
import { useRouter } from 'src/hooks/use-router';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify/Iconify';


const schema = yup.object().shape({
    name: yup.string().required('الاسم مطلوب'),
    email: yup.string().email('بريد الكتروني غير صالح').required('البريد الالكتروني مطلوب'),
    password: yup.string().required('كلمة المرور مطلوبة').min(6, 'كلمة المرور يجب ان تكون اكثر من 6 احرف'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), undefined], 'كلمة المرور غير مطابقة')  // Replace `null` with `undefined`
        .required('تأكيد كلمة المرور مطلوبة'),
});



export default function RegisterPage() {
    const { register } = useAuthContext();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const password = useBoolean();
    const confirmPassword = useBoolean();
    const methods = useForm({
        resolver: yupResolver(schema),
    })
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = methods

    const onSubmit = handleSubmit(async (data) => {
        const { name, email, password } = data;
        try {
            await register(name, email, password);
            router.push(paths.dashboard.index);
        } catch (error: any) {
            console.error(error);
            const errMsg = errorProcess(error)
            setError(errMsg)
        }
    });
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ my: 2, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    تسجيل حساب جديد
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
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        id="username"
                                        label="الاسم"
                                        autoFocus
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        id="email"
                                        label="البريد الالكتروني"
                                        autoComplete="email"
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
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        name="password"
                                        label="كلمة المرور"
                                        id="password"
                                        type={password.value ? "text" : "password"}
                                        autoComplete="new-password"
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
                        <Grid item xs={12}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        name="confirmPassword"
                                        label="تأكيد كلمة المرور"
                                        type={confirmPassword.value ? "text" : "password"}
                                        id="confirmPassword"
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={confirmPassword.onToggle} edge="end">
                                                        <Iconify
                                                            icon={
                                                                confirmPassword.value
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
                        تسجيل
                    </LoadingButton>
                    <Box textAlign='center'>
                        <Link href={paths.auth.login} variant="body2">
                            لديك حساب بالفعل؟ تسجيل الدخول
                        </Link>
                    </Box>
                </FormProvider>
            </Paper>
        </Container>
    );
}