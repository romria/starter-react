import React, {type ReactElement, type ChangeEvent, type InputHTMLAttributes} from 'react';
import cs from 'classnames';

import classes from './input.scss';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void
};

// type Props = InputHTMLAttributes<HTMLInputElement>

const Input = ({
  className,
  onChange,
  ...props
}: Props): ReactElement => {
  const onChangeVal = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
    <input
      className={cs(classes.input, className)}
      onChange={onChangeVal}
      autoComplete="off"
      {...props}
    />
  );
};

export default Input;