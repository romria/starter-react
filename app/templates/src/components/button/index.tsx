import cs from 'classnames';
import React, {type ButtonHTMLAttributes, type ReactElement} from 'react';

import classes from './button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPrimary?: boolean
};

const Button = ({
  isPrimary,
  children,
  className,
  ...props
}: Props): ReactElement => (
  <button
    className={cs(
      classes.button,
      {[classes.primary]: isPrimary},
      className,
    )}
    type="button"
    {...props}
  >
    {children}
  </button>
);

export default Button;
