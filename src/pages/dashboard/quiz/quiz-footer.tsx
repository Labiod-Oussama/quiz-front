import { Button, Stack } from '@mui/material'
import { useContext } from 'react';
import Iconify from 'src/components/iconify/Iconify'
import { Context } from './quiz';

interface Props {
    indexQuestion: number;
    totalQuestions: number;
    onNext?: VoidFunction;
    onPrevious?: VoidFunction;
    onFinish?: VoidFunction;
}

export default function QuizFooter({
    indexQuestion,
    totalQuestions,
    onNext,
    onPrevious,
    onFinish,
}: Props) {
    const { readonly } = useContext(Context);
    return (
        <Stack
            spacing={2}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                spacing={5}
            >
                <Button
                    variant='outlined'
                    color='inherit'
                    startIcon={
                        <Iconify icon='hugeicons:next' />
                    }
                    onClick={onPrevious}
                    disabled={indexQuestion === 1}
                >
                    السابق
                </Button>
                <Button
                    variant='contained'
                    color='inherit'
                    endIcon={
                        <Iconify
                            icon='hugeicons:previous'
                        />
                    }
                    onClick={onNext}
                    disabled={indexQuestion === totalQuestions}
                >
                    التالي
                </Button>
            </Stack>
            <Stack
                alignItems='center'
            >
                {
                    ((indexQuestion === totalQuestions) && !readonly) &&
                    <Button
                        variant='contained'
                        color='warning'
                        endIcon={
                            <Iconify icon='ep:finished' />
                        }
                        onClick={onFinish}
                    >
                        انهاء
                    </Button>
                }
            </Stack>
        </Stack>
    )
}
