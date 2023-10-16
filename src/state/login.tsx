import React, {createContext, useContext, useReducer, useMemo, useCallback} from 'react';
import {type AnyAction} from '../types';

enum LoginActionType {
  CHANGE_FORM_VALUE = 'CHANGE_FORM_VALUE',
  CLEAR_FORM = 'CLEAR_FORM',
}

interface ChangeLoginFormValue extends AnyAction {
  type: LoginActionType.CHANGE_FORM_VALUE
  payload: {
    field: keyof State
    value: string
  }
}

interface ClearLoginForm extends AnyAction {
  type: LoginActionType.CLEAR_FORM
}

type LoginAction = ChangeLoginFormValue | ClearLoginForm;

interface State {
  username: string
  password: string
}

interface LoginContextValue {
  state: State
  changeLoginFormValue: (field: keyof State, value: string) => void
  clearLoginForm: () => void
}

const getInitialState = (): State => ({
  username: '',
  password: '',
});

const LoginReducer = (state: State, {type, payload}: LoginAction): State => {
  switch (type) {
    case LoginActionType.CHANGE_FORM_VALUE:
      return {
        ...state,
        [payload.field]: payload.value,
      };
    case LoginActionType.CLEAR_FORM:
      return {
        // ...state,
        username: '',
        password: '',
      };
    default:
      return state;
  }
};

const LoginContext = createContext<LoginContextValue | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [state, dispatch] = useReducer(LoginReducer, getInitialState());
  const changeLoginFormValue = useCallback((field: keyof State, value: string) => {
    dispatch({type: LoginActionType.CHANGE_FORM_VALUE, payload: {field, value}});
  }, [dispatch]);
  const clearLoginForm = useCallback(() => {
    dispatch(({type: LoginActionType.CLEAR_FORM}));
  }, [dispatch]);
  const value = useMemo((): LoginContextValue => ({
    state,
    changeLoginFormValue,
    clearLoginForm,
  }), [
    state,
    changeLoginFormValue,
    clearLoginForm,
  ]);

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextValue => {
  const context = useContext(LoginContext);
  if (context == null) {
    throw new Error('useLogin must be used within an LoginProvider');
  }

  return context;
};
