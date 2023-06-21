import React, {ReactElement} from 'react';
import {Outlet, Link} from 'react-router-dom';

import styles from './root.module.scss';

const Root = (): ReactElement => (
  <div className={styles.root}>
    <h1>Hello React</h1>
    -----------------------
    <br />
    <Link to={`not-found-route/42`}>404 page preview</Link>
    <br/>
    <Link to={`child`}>Child Route</Link>
    <br />
    -----------------------
    <Outlet />
  </div>
);

export default Root;
