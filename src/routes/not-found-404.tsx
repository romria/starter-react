import React, {ReactElement} from 'react';
import {useRouteError, isRouteErrorResponse, Link} from 'react-router-dom';

export default function ErrorPage(): ReactElement {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      {(() => {
        if (isRouteErrorResponse(error)) {
          return (
            <>
              <p>{error.status} - {error.statusText}</p>
              {error.data?.message && (
                <p>
                  <i>{error.data.message}</i>
                </p>
              )}
            </>
          )
        } if (error instanceof Error) {
          return <p><i>{error.message}</i></p>;
        } if (typeof error === 'string') {
          return <p><i>{error}</i></p>;
        }
        return <p><i>Unknown error</i></p>
      })()}
      <br />
      <Link to="/">Back to Home Page</Link>
    </div>
  );
}
