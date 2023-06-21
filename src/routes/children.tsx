import React, {type ReactElement} from 'react';
import {Link} from 'react-router-dom';

import styles from './child.module.scss';

const Child = (): ReactElement => (
  <div className={styles.root}>
    <h2>Child Route with React Router v6</h2>
    <br />
    <Link to="/">Back to Home Page</Link>
  </div>
);

export default Child;
