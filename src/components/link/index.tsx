import cs from 'classnames';
import React, {type ReactElement} from 'react';
import {NavLink, type NavLinkProps} from 'react-router-dom';

import classes from './link.scss';

interface Props extends Omit<NavLinkProps, 'className'> {
  activeClassName?: string
  className?: string
}

const Link = ({children, className, activeClassName, ...props}: Props): ReactElement => (
  <NavLink
    className={({isActive}) => cs(classes.link, className, isActive && activeClassName)}
    {...props}
  >
    {children}
  </NavLink>
);

export default Link;
