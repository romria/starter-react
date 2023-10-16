import React, {createContext, useContext, useReducer, useMemo, useCallback} from 'react';
import {type AnyAction} from '../types';

enum AuthActionType {
  SET_LOGGED_USER = 'SET_LOGGED_USER',
  LOGOUT = 'LOGOUT',
}

interface SetLoggedUser extends AnyAction {
  type: AuthActionType.SET_LOGGED_USER
  payload: { username: string, role: string }
}

interface Logout extends AnyAction {
  type: AuthActionType.LOGOUT
}

type AuthAction = SetLoggedUser | Logout;

interface State {
  isLogged: boolean
  username: string
  role: string
}

interface AuthContextValue {
  state: State
  setLoggedUser: ({username, role}: { username: string, role: string }) => void
  logout: () => void
}

const getInitialState = (): State => ({
  isLogged: false,
  username: '',
  role: '',
});

const AuthReducer = (state: State, {type, payload}: AuthAction): State => {
  switch (type) {
    case AuthActionType.SET_LOGGED_USER:
      return {
        // ...state,
        isLogged: true,
        username: payload.username,
        role: payload.role,
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, getInitialState());
  const setLoggedUser = useCallback(({username, role}: { username: string, role: string }): void => {
    dispatch({type: AuthActionType.SET_LOGGED_USER, payload: {username, role}});
  }, [dispatch]);
  const logout = useCallback(() => {
    dispatch({type: AuthActionType.LOGOUT});
  }, [dispatch]);

  const value = useMemo((): AuthContextValue => ({
    state,
    setLoggedUser,
    logout,
  }), [
    state,
    setLoggedUser,
    logout,
  ]);

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
