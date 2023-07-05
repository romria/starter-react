import React, {createContext, useContext, useReducer, useMemo} from 'react';

export enum AuthActionType {
  SET_LOGGED_USER = 'AUTH_SET_LOGGED_USER',
  LOGOUT = 'AUTH_LOGOUT',
}

interface AuthAction {
  type: string
  payload?: {
    username: string
    role: string
  }
}

interface State {
  isLogged: boolean
  username: string
  role: string
}

type Dispatch = (action: AuthAction) => void;

interface AuthContextValue {
  state: State
  authDispatch: Dispatch
}

const getInitialState = (): State => ({
  isLogged: false,
  username: '',
  role: '',
});

const AuthReducer = (state: State, action: AuthAction): State => {
  switch (action.type) {
    case AuthActionType.SET_LOGGED_USER:
      return {
        // ...state,
        isLogged: true,
        username: (action.payload != null) ? action.payload.username : '',
        role: (action.payload != null) ? action.payload.role : '',
      };
    case AuthActionType.LOGOUT:
      return {
        // ...state,
        isLogged: false,
        username: '',
        role: '',
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [state, authDispatch] = useReducer(AuthReducer, getInitialState());
  const value = useMemo(() => ({state, authDispatch}), [state, authDispatch]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
