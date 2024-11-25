import { alpha, Card, Stack, Typography } from '@mui/material';
import React from 'react'
import Iconify from 'src/components/iconify/Iconify';
import { ColorSchema } from 'src/theme/palette';


interface Props {
    result: number;
}

enum ResultType {
    GOOD = 'good',
    MEDIUM = 'medium',
    BAD = 'bad',
}

export const etatResult: {
    [etat in ResultType]: {
        title: string;
        description: string;
        icon: string;
        color: ColorSchema;
    };
} = {

    [ResultType.BAD]: {
        title: "اضطرابات معرفية حادة",
        description: "خرف من النوع الحاد",
        icon: "ic:round-sentiment-dissatisfied",
        color: 'error'
    },
    [ResultType.MEDIUM]: {
        title: "اضطرابات خفيفة",
        description: '"خرف من النوع الخفيف "الطور الابتدائي',
        icon: "ic:round-sentiment-neutral",
        color: 'warning'
    },
    [ResultType.GOOD]: {
        title: "عدم وجود اضطرابات معرفية",
        icon: "ic:round-sentiment-very-satisfied",
        description: "أي عدم وجود خرف",
        color: 'success'
    }

}
export default function QuizResult({
    result
}: Props) {

    const { title, description, icon, color } = etatResult[getType(result)];
    return (
        <>
            <Stack
                component={Card}
                variant='outlined'
                spacing={1.5}
                sx={{
                    p: { xs: 3, md: 5 },
                    alignItems: "center",
                    mx: "auto",
                    width: "max-content",
                    bgcolor: (theme) => alpha(theme.palette[color].main, 0.05),
                }}
            >
                <Iconify
                    icon={icon}
                    color={`${color}.main`}
                    width={'3rem'}
                />
                <Typography
                    variant="h4"
                    color={`${color}.main`}
                >
                    {result}
                </Typography>
                <Typography
                    variant="h4"
                    color={`${color}.main`}
                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    {description}
                </Typography>

            </Stack>
        </>
    )
}

export function getType(result: number): ResultType {
    if (result >= 0 && result <= 17) return ResultType.BAD;
    if (result > 17 && result <= 23) return ResultType.MEDIUM;
    return ResultType.GOOD;
}