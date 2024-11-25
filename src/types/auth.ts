import { Dispatch } from "react";

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  };
};


export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

type CanRemove = {
  login?: (email: string, password: string) => Promise<void>;
  register?: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
};

export type JWTContextType = CanRemove & {
  user: AuthUserType;
  loading: boolean;
  authenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  dispatch: Dispatch<any>;
};

