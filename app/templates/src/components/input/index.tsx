import React, {type ReactElement, type ChangeEvent, type InputHTMLAttributes, useCallback} from 'react';
import cs from 'classnames';

import classes from './input.scss';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void
};

const Input = ({
  className,
  onChange,
  ...props
}: Props): ReactElement => {
  const onChangeVal = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    onChange(e.target.value);
  }, [onChange]);

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
