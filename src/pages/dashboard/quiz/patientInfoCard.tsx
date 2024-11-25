import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Stack,
    alpha,
} from '@mui/material';
import { School } from '@mui/icons-material';
import { EDUCATIONLEVEL } from 'src/types/quiz';
export default function PatientInfoCard({ firstName, lastName, educationLevel }: { firstName: string, lastName: string, educationLevel: EDUCATIONLEVEL }) {
    return (
        <Card
            variant='outlined'
            sx={{
                bgcolor: (theme) => alpha(theme.palette.grey[800], 0.05),
                mb: 2,
            }}
        >
            <CardContent>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={1}
                    justifyContent='space-between'
                >
                    <Typography variant="subtitle1">
                        الاسم : {firstName}
                    </Typography>
                    <Typography variant="subtitle1">
                        اللقب : {lastName}
                    </Typography>

                    <Box
                        display='flex'
                        alignItems='center'
                    >
                        <Typography variant="subtitle1">
                            المستوى :
                        </Typography>
                        <Chip
                            icon={<School />}
                            label={educationLevel}
                            size='small'
                            color="primary"
                            variant="filled"
                            sx={{ ml: 1 }}
                        />
                    </Box>
                </Stack>

            </CardContent>
        </Card>
    )
}
