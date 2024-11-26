import { Card, LinearProgress, Stack } from '@mui/material';
import Label from 'src/components/label/label';

interface Props {
    totalQuestions: number;
    indexQuestion: number;
}

export default function QuizTopbar({
    totalQuestions,
    indexQuestion
}: Props) {
    return (
        <>
            <Stack
                direction='row'
                spacing={2}
                component={Card}
                variant='outlined'
                sx={{
                    p: 2,
                    alignItems: "center",
                    // justifyContent: 'center'
                }}
            >
                <Label
                    color='error'
                    variant='soft'
                    sx={{
                        py: 1.5,
                        fontSize: '1rem',
                    }}
                >
                    التقدم : {Math.round((indexQuestion - 1) / totalQuestions * 100)} %
                </Label>
                <LinearProgress
                    variant="determinate"
                    color='error'
                    value={Math.round((indexQuestion - 1) / totalQuestions * 100)}
                    sx={{
                        width: '100%',
                        // width: { xs: 150, md: 300 },
                        height: 8,
                        borderRadius: 4,
                        transform: 'rotate(180deg)',
                    }}
                />
            </Stack>
        </>
    )
}
