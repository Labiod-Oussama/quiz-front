import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider from 'src/components/hook-form/form-provider';
import { MenuItem, TextField } from '@mui/material';
import { date, mixed, object, string } from 'yup';
import { EDUCATIONLEVEL, PatientType } from '../../../types/quiz';
import { errorProcess } from 'src/utils/error-process';
import { addPatient } from 'src/api/patient/info-patient';
import { enqueueSnackbar } from 'notistack';
import { mutate } from 'swr';
import { endpoints } from 'src/types/axios';


// ----------------------------------------------------------------------

type Props = {
  currentPatient?: PatientType;
  onClose?: VoidFunction;
};

export default function PatientNewEditForm({ currentPatient, onClose }: Props) {
  const NewUserSchema = object().shape({
    firstName: string().required('الاسم اجباري'),
    lastName: string().required('اللقب اجباري'),
    educationLevel: mixed<EDUCATIONLEVEL>().oneOf(Object.values(EDUCATIONLEVEL), 'Invalid etat').default(EDUCATIONLEVEL.FIRST_PRIMARY),
    examDate: date().optional()
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentPatient?.firstName || '',
      lastName: currentPatient?.lastName || '',
      educationLevel: currentPatient?.educationLevel || EDUCATIONLEVEL.FIRST_PRIMARY,
      examDate: currentPatient?.examDate || undefined
    }),
    [currentPatient]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addPatient(data);
      await mutate(endpoints.patient.getAll);
      enqueueSnackbar(currentPatient ? 'تم التعديل' : 'تمت الاضافة بنجاح', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      onClose?.();
    } catch (error) {
      const errMsg = errorProcess(error);
      enqueueSnackbar(errMsg, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
    }
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card
        variant='outlined'
        sx={{ p: 3 }}
      >
        <Box
          gap={2}
          display="grid"
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="firstName"
                label="الاسم"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="lastName"
                label="اللقب"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name='educationLevel'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                fullWidth

                SelectProps={{
                  sx: { textTransform: 'capitalize' },
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        maxHeight: 250,
                        overflowY: 'auto',
                        // custom the bar color
                        '&::-webkit-scrollbar': {
                          width: 6,
                          height: 6,
                        },
                        '&::-webkit-scrollbar-thumb': {
                          borderRadius: 3,
                          bgcolor: 'primary.dark',
                        }
                      },
                    },
                  },
                }}
                error={!!error}
                helperText={error ? error?.message : undefined}
              >
                {
                  Object.values(EDUCATIONLEVEL).map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))
                }
              </TextField>
            )}
          />

        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentPatient ? 'أضف' : 'حفظ'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider >
  );
}
