import { alpha, Card, CardContent, CardHeader, Checkbox, Divider, IconButton, Stack, StackProps, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import Iconify from 'src/components/iconify/Iconify'
import Label from 'src/components/label/label'
import { IQuestion, QuestionProps } from 'src/data/questions'
import { useBoolean } from 'src/hooks/use-boolean'
import { useCountdownSeconds } from 'src/hooks/use-count-down'
import { Context } from './quiz'
import PaintComponent from './paint-component'


interface Props extends QuestionProps {
    answers: boolean[];
    onAnswerChange: (updatedAnswers: boolean[]) => void;
}

export default function QuizQuestion({
    id,
    title,
    time,
    questions,
    type,
    description,
    answers,
    onAnswerChange,
}: Props) {

    const { readonly } = useContext(Context);

    const { countdown, counting, startCountdown, resetCountdown } = useCountdownSeconds(time);

    useEffect(() => resetCountdown(), [id, resetCountdown]);

    const isArray = Array.isArray(questions);

    useEffect(() => {
        if (isArray && answers.length === 0) {
            onAnswerChange(new Array(questions.length).fill(false));
        }
    }, [isArray, answers, onAnswerChange, questions]);

    return (
        <>
            <Card
                variant='outlined'
                sx={{
                    bgcolor: (theme) => alpha(theme.palette.text.disabled, 0.05),
                }}
            >
                <CardHeader
                    title={
                        <Label
                            variant='soft'
                            color='error'
                            sx={{
                                py: 2,
                                fontSize: '1rem',
                            }}
                        >
                            السؤال {id} : {title}
                        </Label>
                    }
                    action={
                        (time && !readonly) &&
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        >
                            <IconButton
                                size='small'
                                color={
                                    (counting || countdown > 0) ? 'warning' : 'error'
                                }
                                onClick={
                                    (counting || countdown > 0) ? startCountdown : resetCountdown
                                }
                            >
                                <Iconify
                                    icon={
                                        counting || countdown > 0 ? 'fluent:timer-16-regular' : 'iconamoon:restart-fill'
                                    }
                                />
                            </IconButton>
                            <Label
                                color={
                                    (counting || countdown > 0) ? 'warning' : 'error'
                                }
                                variant='soft'
                            >
                                {countdown}
                                {' '}
                                {
                                    countdown > 10
                                        ? 'ثانية'
                                        : 'ثواني'
                                }
                            </Label>
                        </Stack>
                    }
                />
                <CardContent>
                    <Typography
                        paragraph
                    >
                        {description}
                    </Typography>
                    <Divider flexItem />
                    <br />
                    <Stack
                        spacing={1}
                    >
                        {renderQuestions(questions, answers, onAnswerChange, type)}
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

function renderQuestions(
    questions: string[] | number[] | IQuestion,
    answers: boolean[],
    onAnswerChange: (updatedAnswers: boolean[]) => void,
    type?: QuestionProps['type'],
) {

    const { readonly } = useContext(Context);
    const showSubQuestions = useBoolean();

    if (typeof questions === 'object' && 'mainQuestion' in questions) {
        const { mainQuestion, subQuestions } = questions as IQuestion;
        return (
            <>
                <OneQuestion
                    question={mainQuestion}
                    checked={(!showSubQuestions.value ? answers[0] : (answers.length === subQuestions.length && answers.every((item) => item))) || false}
                    onChangeResult={(checked) => {
                        onAnswerChange(new Array(subQuestions.length).fill(checked));
                    }}
                    toggleIcon={
                        <IconButton onClick={showSubQuestions.onToggle}>
                            <Iconify
                                icon={showSubQuestions.value ? 'eva:arrow-ios-upward-outline' : 'eva:arrow-ios-downward-outline'}
                            />
                        </IconButton>
                    }
                />
                {showSubQuestions.value &&
                    subQuestions.map((subQuestion, index) => (
                        <OneQuestion
                            key={index}
                            question={subQuestion}
                            checked={answers[index] || false}
                            onChangeResult={(checked) => {
                                const updatedAnswers = [...answers];
                                updatedAnswers[index] = checked;
                                onAnswerChange(updatedAnswers);
                            }}
                            sx={{
                                bgcolor: (theme) => alpha(theme.palette.text.disabled, 0.1),
                            }}
                        />
                    ))}
            </>
        );
    } else if (Array.isArray(questions)) {
        return (
            <>
                {
                    questions.map((question, index) => (
                        <OneQuestion
                            key={index}
                            question={question}
                            checked={answers[index] || false}
                            onChangeResult={(checked) => {
                                const updatedAnswers = [...answers];
                                updatedAnswers[index] = checked;
                                onAnswerChange(updatedAnswers);
                            }}
                        />
                    ))
                }
                {
                    (type === 'text' && !readonly) && (
                        <PaintComponent type='text' />
                    )
                }
                {
                    (type === 'picture' && !readonly) && (
                        <PaintComponent />
                    )

                    // <ReactPainter
                    //     width={300}
                    //     height={300}
                    //     onSave={blob => console.log(blob)}

                    //     render={({ triggerSave, canvas, }) => {
                    //         return (
                    //             <>
                    // <Stack
                    //     direction={{ xs: 'column-reverse', md: 'row' }}
                    //     spacing={2}
                    //     sx={{
                    //         p: 2,
                    //         justifyContent: 'space-between',
                    //     }}
                    // >
                    //     <div
                    //         style={{
                    //             width: mdUp ? 300 : 230,
                    //             height: mdUp ? 300 : 230,
                    //             backgroundColor: theme.palette.background.paper,
                    //             borderRadius: 8,
                    //             border: '1px solid #000',
                    //         }}
                    //     >
                    //         {canvas}
                    //     </div>
                    //     <img
                    //         src="/assets/shape.jpg"
                    //         alt="image"
                    //         width={mdUp ? 300 : 230}
                    //         height={mdUp ? 300 : 230}
                    //     />
                    // </Stack>
                    //                 <Stack
                    //                     alignItems='center'
                    //                 >

                    //                     <Button
                    //                         variant='outlined'
                    //                         sx={{
                    //                             width: "max-content",
                    //                         }}
                    //                     >
                    //                         اعادة الرسم
                    //                     </Button>
                    //                 </Stack>
                    //             </>
                    //         )
                    //     }
                    //     }
                    // />
                }
            </>
        )
            ;
    }
    return null;
}




interface OneQuestionProps extends StackProps {
    question: string | number;
    checked: boolean;
    onChangeResult: (checked: boolean) => void;
    toggleIcon?: React.ReactNode;
}

function OneQuestion({ question, checked, onChangeResult, toggleIcon, sx, ...other }: OneQuestionProps) {

    const { readonly } = useContext(Context);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeResult(event.target.checked);
    };

    return (
        <Stack
            direction="row"
            sx={{
                p: 1.2,
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "background.paper",
                borderRadius: "8px",
                ...(checked && {
                    borderRight: (theme) => `solid 5px ${theme.palette.primary.main}`,
                    borderRadius: '8px 0 0 8px'
                }),

                ...sx
            }}
            {...other}
        >
            <Typography
                variant="subtitle1"
            >
                {question}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
                {toggleIcon}
                <Checkbox checked={checked} onChange={handleChange} disabled={readonly} />
            </Stack>
        </Stack>
    );
}