import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { AuthUserType, ActionMapType, AuthStateType } from 'src/types/auth';
import { isValidToken } from './utils';
import axiosInstance, { endpoints } from 'src/types/axios';
import { AuthContext } from './auth-context';


export enum Types {
    INITIAL = 'INITIAL',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    LOGOUT = 'LOGOUT',
}

export type Payload = {
    [Types.INITIAL]: {
        user: AuthUserType;
    };
    [Types.LOGIN]: {
        user: AuthUserType;
    };
    [Types.REGISTER]: {
        user: AuthUserType;
    };
    [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];


const initialState: AuthStateType = {
    user: null,
    loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
    if (action.type === Types.INITIAL) {
        return {
            loading: false,
            user: action.payload.user,
        };
    }
    if (action.type === Types.LOGIN) {
        return {
            ...state,
            user: action.payload.user,
        };
    }
    if (action.type === Types.REGISTER) {
        return {
            ...state,
            user: action.payload.user,
        };
    }
    if (action.type === Types.LOGOUT) {
        return {
            ...state,
            user: null,
        };
    }
    return state;
};

// ----------------------------------------------------------------------

export const STORAGE_INFOS = 'infos';

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {

    const [state, dispatch] = useReducer(reducer, initialState);


    const initialize = useCallback(async () => {
        try {
            const user = JSON.parse(localStorage.getItem(STORAGE_INFOS) || '{}');

            if (Object.keys(user).length !== 0 && isValidToken(user.accessToken || '')) {

                axiosInstance.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;

                const res = await axiosInstance.get(endpoints.account.getMyInfos);
                dispatch({
                    type: Types.INITIAL,
                    payload: {
                        user: {
                            ...res.data
                        },
                    },
                });
            } else {
                dispatch({
                    type: Types.INITIAL,
                    payload: {
                        user: null,
                    },
                });
            }

        } catch (error) {
            dispatch({
                type: Types.INITIAL,
                payload: {
                    user: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    // LOGIN
    const login = useCallback(async (email: string, password: string) => {
        const data = {
            email,
            password,
        };

        const res = await axiosInstance.post(endpoints.auth.login, data);

        const user = res.data;

        localStorage.setItem(STORAGE_INFOS, JSON.stringify(user))

        dispatch({
            type: Types.LOGIN,
            payload: {
                user
            },
        });

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;

    }, []);

    // REGISTER
    const register = useCallback(
        async (name: string, email: string, password: string) => {

            const data = {
                email,
                password,
                name,
            };


            const res = await axiosInstance.post(endpoints.auth.register, data);

            const user = res.data;

            localStorage.setItem(STORAGE_INFOS, JSON.stringify(user))

            dispatch({
                type: Types.REGISTER,
                payload: {
                    user
                },
            });

            axiosInstance.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
        },
        []
    );


    // LOGOUT
    const logout = useCallback(async () => {
        localStorage.removeItem(STORAGE_INFOS);
        dispatch({
            type: Types.LOGOUT,
        });
        axiosInstance.defaults.headers.common.Authorization = '';
    }, []);

    const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

    const status = state.loading ? 'loading' : checkAuthenticated;

    const memoizedValue = useMemo(
        () => ({
            user: state.user,
            dispatch,
            loading: status === 'loading',
            authenticated: status === 'authenticated',
            login,
            register,
            logout,
        }),
        [login, logout, register, state.user, dispatch, status]
    );

    return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
