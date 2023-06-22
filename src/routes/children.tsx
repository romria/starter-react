import React, {type ReactElement} from 'react';
import {Link} from 'react-router-dom';
import exampleJPG from '../assets/images/example.jpg';
import exampleSVG from '../assets/images/quiz.svg';

import styles from './child.module.scss';

const Child = (): ReactElement => (
  <div className={styles.root}>
    <h2>Child Route with React Router v6</h2>
    <div>
      <Link to="/">Back to Home Page</Link>
    </div>
    <img src={exampleJPG} alt="import as external example" />
    <br />
    <img src={exampleSVG} alt="import as inline example" />
  </div>
);

export default Child;
