import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Select,
    MenuItem,
    Button,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import { useGetAllPatient } from 'src/api/patient/info-patient';
import { useQuizContext } from 'src/context/use-quiz-context';
import { Actions } from 'src/context/quiz-provider';

export default function PatientExamCard() {
    const { data: patients } = useGetAllPatient();

    const { patient, dispatch } = useQuizContext();

    const handlePatientChange = (event: SelectChangeEvent) => {
        const patient = patients.find((patient) => patient.id === event.target.value);
        if (patient) {
            dispatch({ type: Actions.SAVE_PATIENT, payload: { patient } });
        }
    };

    const handleStartExam = () => {
        dispatch({ type: Actions.START_QUIZ });
    };

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', p: 1 }}>
            <CardContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom textAlign='center'>
                        لبدء الفحص، يرجى تحديد المريض
                    </Typography>
                    <Select
                        value={patient?.id as string}
                        onChange={handlePatientChange}
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        {patients.map((patient, index) => (
                            <MenuItem key={patient?.id || index} value={patient.id}>
                                {`${patient.firstName} ${patient.lastName}`}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleStartExam}
                    disabled={!patient?.id}
                >
                    بدء الفحص
                </Button>
            </CardActions>
        </Card>
    );
}