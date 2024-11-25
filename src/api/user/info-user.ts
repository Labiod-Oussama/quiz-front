import useSWR from "swr";
import { useMemo } from "react";

const options = {
    // revalidateIfStale: false,
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

