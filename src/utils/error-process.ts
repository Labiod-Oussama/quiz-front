import { AxiosError } from "axios";

export function errorProcess(error: any) {
    if (error instanceof AxiosError) {
        return error.response?.data.message
    }
    if (typeof error === 'string') {
        return error
    }
    if (typeof error === 'object') {
        if (Array.isArray(error.message)) {

            return error.message[0]
        }
        if (typeof error.message === 'string') {
            return error.message
        }
    }
}