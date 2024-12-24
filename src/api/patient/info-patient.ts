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

export function useGetPatientById(id?: string | number): ResponseReturn<PatientType> {
    const URL = id ? endpoints.patient.getOne(id) : null
    const { data, error, isLoading } = useSWR(URL, fetcher, options);
    const memoizedValue = useMemo(() => ({
        data: data || {} as PatientType,
        error,
        loading: isLoading,
    }), [data, error, isLoading]);
    return memoizedValue;
}

export async function addPatient(patient: PatientType): Promise<PatientType> {
    const URL = endpoints.patient.addOne;
    return new Promise((resolve, reject) => {
        axiosInstance.post(URL, patient)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export async function updatePatient(patient: PatientType): Promise<PatientType> {
    if (!patient.id) throw new Error('id is required');
    const URL = endpoints.patient.updateOne(patient.id);
    return new Promise((resolve, reject) => {
        axiosInstance.put(URL, patient)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export async function removePatient(id: string | number): Promise<void> {
    const URL = endpoints.patient.removeOne(id);
    return new Promise((resolve, reject) => {
        axiosInstance.delete(URL)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}