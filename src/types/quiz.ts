import { Dispatch } from "react";

export enum EDUCATIONLEVEL {
    FIRST_PRIMARY = 'أولى ابتدائي',
    SECOND_PRIMARY = 'ثانية ابتدائي',
    THIRD_PRIMARY = 'ثالثة ابتدائي',
    FOURTH_PRIMARY = 'رابعة ابتدائي',
    FIFTH_PRIMARY = 'خامسة ابتدائي',
    FIRST_INTERMEDIAIRE = 'أولى متوسط',
    SECOND_INTERMEDIAIRE = 'ثانية متوسط',
    THIRD_INTERMEDIAIRE = 'ثالثة متوسط',
    FOURTH_INTERMEDIAIRE = 'رابعة متوسط',
    FIRST_SECONDARY = 'أولى ثانوي',
    SECOND_SECONDARY = 'ثانية ثانوي',
    THIRD_SECONDARY = 'ثالثة ثانوي',
    UNIVERSITY = 'جامعي',
}


export type PatientType = {
    id?: number | string;
    firstName: string;
    lastName: string;
    age: number;
    educationLevel: EDUCATIONLEVEL;
    examDate?: Date | null
}

export type PatientStateType = {
    patient: PatientType | null,
    startQuiz: boolean
};

export type QUIZContextType = {
    patient: PatientType | null;
    startQuiz: boolean;
    dispatch: Dispatch<any>;
    saveQuiz?: (patientId: number | string, answers: Record<number, boolean[]>, result: number) => Promise<void>;
};


export type QuizDataType = {
    id: number;
    patient: PatientType;
    answers: Record<number, boolean[]>;
    result: number;
    examDate?: Date | null;
}