import React, {type ReactElement, type KeyboardEvent, useRef, useCallback, type ReactNode} from 'react';

import classes from './dropdown.scss';

interface Props {
  children?: ReactNode
  overlay?: ReactNode
}

const Dropdown = ({children, overlay}: Props): ReactElement => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onShow = useCallback(() => {
    if (overlayRef.current === null) return;
    overlayRef.current.classList.toggle(classes.visible);
    overlayRef.current.focus();
  }, [overlayRef]);
  const onFocusOut = (): void => {
    timeoutIdRef.current = setTimeout(() => {
      if (overlayRef.current === null) return;
      overlayRef.current.classList.remove(classes.visible);
    }, 0);
  };
  const onFocusIn = (): void => {
    if (timeoutIdRef.current === null) return;
    clearTimeout(timeoutIdRef.current);
  };

  const onKeyDownTrigger = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (overlayRef.current !== null && (e.key === 'Space' || e.key === 'Enter')) {
      e.preventDefault();
      overlayRef.current.classList.toggle(classes.visible);
      overlayRef.current.focus();
    }
  };

  const onKeyDownOverlay = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Escape' && overlayRef.current !== null) {
      e.preventDefault();
      overlayRef.current.classList.remove(classes.visible);
    }
  };

  return (
    <div>
      <div
        onClick={onShow}
        onKeyDown={onKeyDownTrigger}
        onBlur={onFocusOut}
        onFocus={onFocusIn}
        role="menu"
        tabIndex={0}
      >
        {children}
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={classes.overlay}
        ref={overlayRef}
        onBlur={onFocusOut}
        onFocus={onFocusIn}
        onKeyDown={onKeyDownOverlay}
        role="dialog"
        tabIndex={-1}
      >
        {overlay}
      </div>
    </div>
  );
};
export default Dropdown;
