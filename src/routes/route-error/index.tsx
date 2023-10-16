import React, {type ReactElement} from 'react';
import {useRouteError, isRouteErrorResponse} from 'react-router-dom';
import Link from '../../components/link';

const RouteError = (): ReactElement => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} - ${error.statusText}.${(error.data != null) ? ` "${JSON.stringify(error.data)}"` : ''}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div>
      <h1>Oops! Something went wrong...</h1>
      <p><i>{errorMessage}</i></p>
      <br />
      <Link to="/">Back to Home Page</Link>
    </div>
  );
};

export default RouteError;
