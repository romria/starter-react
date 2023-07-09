/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
import React, {type FC, type ReactElement, type ReactNode} from 'react';
import {AuthProvider} from './auth';
import {LoginProvider} from './login';

export const combineProviders = (providers: Array<FC<{children: ReactNode}>>): FC<{children: ReactNode}> => providers.reduce(
  (AccumulatedProviders, Provider) => ({children}: {children: ReactNode}): ReactElement => (
    <AccumulatedProviders>
      <Provider>{children}</Provider>
    </AccumulatedProviders>
  ),
  ({children}: {children: ReactNode}) => children,
);

const providers = [
  AuthProvider,
  LoginProvider,
];
export const AppContextProvider = combineProviders(providers);
