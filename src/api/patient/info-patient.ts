import useSWR from "swr";
import { useMemo } from "react";
import axiosInstance, { endpoints, fetcher } from "src/types/axios";
import { PatientType } from "src/types/quiz";

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

export function useGetAllPatient(): ResponseReturn<PatientType[]> {
    const URL = endpoints.patient.getAll
    const { data, error, isLoading } = useSWR(URL, fetcher, options);
    const memoizedValue = useMemo(() => ({
        data: data || [] as PatientType[],
        error,
        loading: isLoading,
    }), [data, error, isLoading]);
    return memoizedValue;
}

export async function addPatient(intervention: PatientType): Promise<PatientType> {
    const URL = endpoints.patient.addOne;
    return new Promise((resolve, reject) => {
        axiosInstance.post(URL, intervention)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}