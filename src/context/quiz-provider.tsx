import { useCallback, useMemo, useReducer } from 'react';
import { ActionMapType } from 'src/types/auth';
import { PatientStateType, PatientType } from 'src/types/quiz';
import { QuizContext } from './quiz-context';
import { saveTest } from 'src/api/quiz/info-quiz';


export enum Actions {
    SAVE_PATIENT = 'SAVE_PATIENT',
    START_QUIZ = 'START_QUIZ',
    RESTART_QUIZ = 'RESTART_QUIZ',
}

export type Payload = {
    [Actions.SAVE_PATIENT]: {
        patient: PatientType
    };
    [Actions.START_QUIZ]: undefined;
    [Actions.RESTART_QUIZ]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];


const initialState: PatientStateType = {
    patient: null,
    startQuiz: false
};

const reducer = (state: PatientStateType, action: ActionsType): PatientStateType => {
    switch (action.type) {
        case Actions.SAVE_PATIENT:
            return {
                ...state,
                patient: action.payload.patient,
            };
        case Actions.START_QUIZ:
            return {
                ...state,
                startQuiz: true,
            };
        case Actions.RESTART_QUIZ:
            return {
                ...state,
                startQuiz: false,
            };
        default:
            return state;
    }
};

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export function QuizProvider({ children }: Props) {

    const [state, dispatch] = useReducer(reducer, initialState);


    const saveQuiz = useCallback(async (
        patientId: number | string,
        answers: Record<number, boolean[]>,
        result: number
    ) => {
        await saveTest(patientId, answers, result);
    }, [])


    const memoizedValue = useMemo(
        () => ({
            patient: state.patient,
            saveQuiz,
            startQuiz: state.startQuiz,
            dispatch,
        }),
        [state.patient, state.startQuiz, dispatch, saveTest]
    );

    return <QuizContext.Provider value={memoizedValue}>{children}</QuizContext.Provider>;
}
