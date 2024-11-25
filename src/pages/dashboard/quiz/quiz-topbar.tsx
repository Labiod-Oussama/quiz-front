import { Card, LinearProgress, linearProgressClasses, Slider, Stack, styled } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label/label';

interface Props {
    totalQuestions: number;
    indexQuestion: number;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.text.disabled,
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.info.main,
    },
}));
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
