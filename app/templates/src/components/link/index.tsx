import cs from 'classnames';
import React, {type ReactElement} from 'react';
import {Link, type LinkProps} from 'react-router-dom';

import classes from './link.scss';

const Button = ({to, children, className}: LinkProps): ReactElement => (
  <Link className={cs(classes.link, className)} to={to}>
    {children}
  </Link>
);

export default Button;
