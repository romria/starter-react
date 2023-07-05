import React, {type FC, type ReactElement, type ReactNode} from 'react';
import {AuthProvider} from './auth';
// import {Dashboard} from './dashboard';

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
  // Dashboard,
];
export const AppContextProvider = combineProviders(providers);
