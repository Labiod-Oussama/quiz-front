import { Button, Container, Paper, Stack, useTheme } from "@mui/material";
import QuizQuestion from "./quiz-question";
import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { QuestionProps, questions } from "src/data/questions";
import Iconify from "src/components/iconify/Iconify";
import QuizFooter from "./quiz-footer";
import QuizTopbar from "./quiz-topbar";
import QuizResult from "./quiz-result";
import { PatientType } from "src/types/quiz";
import PatientInfoCard from "./patientInfoCard";
import { useQuizContext } from "src/context/use-quiz-context";
import { errorProcess } from "src/utils/error-process";
import { enqueueSnackbar } from "notistack";
import { Actions } from "src/context/quiz-provider";


type ActionType = {
    type: 'NEXT' | 'PREVIOUS' | "RESULT" | 'START' | 'FINISH' | 'RESET';
    payload?: any;
}
type StateQuestionType = {
    start: boolean;
    finish: boolean;
    index: number;
    result: number;
};

const reducer = (state: StateQuestionType, action: ActionType) => {
    if (action.type === 'NEXT') {
        return {
            ...state,
            index: state.index + 1,
        }
    }
    else if (action.type === 'PREVIOUS') {
        return {
            ...state,
            index: state.index - 1,
        }
    }
    else if (action.type === 'FINISH') {
        return {
            ...state,
            finish: true,
            result: action.payload.result,
        }
    }
    else return state;
}
const initialState: StateQuestionType = {
    start: false,
    finish: false,
    index: 1,
    result: 0,
}


interface Props {
    currentAnswers?: Record<number, boolean[]>;
    patient?: PatientType;
    readonly?: boolean;
}

export const Context = createContext({} as { readonly: boolean });

export default function Quiz({ currentAnswers, patient, readonly = false }: Props) {

    const { saveQuiz, dispatch: dispatchQuiz } = useQuizContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    const { id, questions: AllQ, title, description, time, type } = questions.find((question) => question.id === state.index) || {} as QuestionProps;

    const [answers, setAnswers] = useState<Record<number, boolean[]>>({});

    const Answers = useMemo(() => {
        return currentAnswers || {}
    }, [currentAnswers]);

    useEffect(() => {
        if (Object.keys(Answers).length > 0) {
            setAnswers(Answers)
        }
    }, [Answers])

    const handleAnswerChange = useCallback(
        (questionId: number, updatedAnswers: boolean[]) => {
            setAnswers((prev) => ({ ...prev, [questionId]: updatedAnswers }));
        },
        []
    );

    const handleFinish = useCallback(async () => {
        if (Object.keys(answers).length === 0) return;
        let total = 0;
        Object.values(answers).map((answer) => {
            total += answer.filter((item) => item).length;
        })
        try {
            await saveQuiz?.(patient?.id!, answers, total);
            dispatch({
                type: "FINISH",
                payload: {
                    result: total
                }
            })
        } catch (error) {
            console.log(error);
            const errMsg = errorProcess(error);
            enqueueSnackbar(errMsg, {
                variant: "error"
            })
        }

    }, [dispatch, answers])

    const theme = useTheme();

    return (
        <>
            <Context.Provider value={{
                readonly: readonly
            }}>
                {
                    !state.finish &&
                    <>
                        <Container
                            maxWidth={theme.breakpoints.up('md') ? 'md' : 'lg'}
                            sx={{
                                mt: 10
                            }}
                        >
                            {
                                patient &&
                                <PatientInfoCard
                                    firstName={patient.firstName}
                                    lastName={patient.lastName}
                                    educationLevel={patient.educationLevel}
                                />
                            }
                            <Stack
                                component={Paper}
                                spacing={{ xs: 1, md: 2 }}
                                sx={{
                                    p: { xs: 1, md: 2 },
                                }}
                            >
                                <QuizTopbar
                                    totalQuestions={questions.length}
                                    indexQuestion={state.index}
                                />
                                <QuizQuestion
                                    id={id}
                                    questions={AllQ}
                                    title={title}
                                    time={time}
                                    type={type}
                                    description={description}
                                    answers={answers[id] || []}
                                    onAnswerChange={(updatedAnswers) => handleAnswerChange(id, updatedAnswers)}
                                />
                                <QuizFooter
                                    indexQuestion={state.index}
                                    totalQuestions={questions.length}
                                    onNext={() => {
                                        dispatch({
                                            type: 'NEXT'
                                        })
                                    }}
                                    onPrevious={() => {
                                        dispatch({
                                            type: 'PREVIOUS'
                                        })
                                    }}
                                    onFinish={handleFinish}
                                />
                            </Stack>
                        </Container>
                    </>
                }
                {
                    state.finish &&
                    <Stack
                        alignItems="center"
                        spacing={2}
                    >
                        <QuizResult
                            result={state.result}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<Iconify icon="iconamoon:restart-bold" />}
                            onClick={() => {
                                dispatchQuiz({
                                    type: Actions.RESTART_QUIZ
                                })
                                setAnswers({} as Record<number, boolean[]>)
                            }}
                        >
                            إعادة المحاولة
                        </Button>
                    </Stack>
                }
            </Context.Provider>
        </>
    )
}
