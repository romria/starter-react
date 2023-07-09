import cs from 'classnames';
import React, {type ReactElement, type ReactNode, useRef, useCallback, useEffect} from 'react';
import classes from './tooltip.scss';

interface Props {
  className?: string
  children?: ReactNode
  overlay: ReactNode
}

const Tooltip = ({overlay, children, className}: Props): ReactElement => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { // set tooltip position on the container's top
    if (overlayRef.current === null || containerRef.current === null) return;
    const {height} = containerRef.current.getBoundingClientRect();
    overlayRef.current.style.top = `-${height + 8}px`;
  }, [overlayRef, containerRef]);

  const onShowTooltip = useCallback(() => {
    if (overlayRef.current === null || containerRef.current === null) return;
    overlayRef.current.classList.add(classes.visible);
  }, [overlayRef]);
  const onHideTooltip = useCallback(() => {
    if (overlayRef.current === null || containerRef.current === null) return;
    overlayRef.current.classList.remove(classes.visible);
  }, [overlayRef]);

  return (
    <div
      className={classes.container}
      ref={containerRef}
      onMouseEnter={onShowTooltip}
      onMouseLeave={onHideTooltip}
    >
      <div className={cs(classes.overlay, className)} ref={overlayRef}>
        {overlay}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
