import useSWR from "swr";
import { useMemo } from "react";
import axiosInstance, { endpoints, fetcher } from "src/types/axios";
import { PatientType, QuizDataType } from "src/types/quiz";

const options = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
};

type ResponseReturn<T> = {
    data: T;
    loading: boolean;
    error: any;
    mutate?: any;
}

export function useGetAllTest(): ResponseReturn<QuizDataType[]> {
    const URL = endpoints.quiz.getAll
    const { data, error, isLoading } = useSWR(URL, fetcher, options);
    const memoizedValue = useMemo(() => ({
        data: data || [] as QuizDataType[],
        error,
        loading: isLoading,
    }), [data, error, isLoading]);
    return memoizedValue;
}

export function useGetTestById(id?: string | number): ResponseReturn<QuizDataType> {
    const URL = id ? endpoints.quiz.getOne(id) : null
    const { data, error, isLoading } = useSWR(URL, fetcher, options);
    const memoizedValue = useMemo(() => ({
        data: data || {} as QuizDataType,
        error,
        loading: isLoading,
    }), [data, error, isLoading]);
    return memoizedValue;
}


export async function saveTest(patientId: string | number, answers: Record<number, boolean[]>, result: number): Promise<PatientType> {
    const URL = endpoints.quiz.saveQuiz(patientId);
    return new Promise((resolve, reject) => {
        axiosInstance.post(URL, {
            answers,
            result
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}