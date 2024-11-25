import { createContext } from 'react';

import { JWTContextType } from 'src/types/auth';


export const AuthContext = createContext({} as JWTContextType);
