import React, {type ReactElement, type ChangeEvent, type FocusEvent, type InputHTMLAttributes, useCallback} from 'react';
import cs from 'classnames';

import classes from './input.scss';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  ref?: React.Ref<HTMLInputElement>
  isLoading?: boolean
  fullWidth?: boolean
  onChange?: (value: string) => void
};

const Input = React.forwardRef<HTMLInputElement, Props>(({
  className,
  onChange,
  disabled,
  isLoading,
  fullWidth,
  onBlur,
  ...props
}, ref): ReactElement => {
  const onChangeVal = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange != null) {
      e.preventDefault();
      onChange(e.target.value);
    }
  }, [onChange]);

  const onBlurCallback = useCallback((e: FocusEvent<HTMLInputElement>) => {
    if (onBlur != null) onBlur(e);
  }, [onBlur]);

  return (
    <input
      ref={ref}
      className={cs(
        classes.input,
        {[classes.loading]: isLoading},
        {[classes.fullWidth]: fullWidth},
        className,
      )}
      onChange={onChangeVal}
      onBlur={onBlurCallback}
      autoComplete="off"
      disabled={isLoading ?? disabled}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
