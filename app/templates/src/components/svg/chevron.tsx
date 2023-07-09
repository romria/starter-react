import React, {type ReactElement} from 'react';

interface Props {
  fill?: string
  className?: string
}
const SVGChevron = ({fill = '#374151', className}: Props): ReactElement => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill={fill} d="M7.99984 8.78094L11.2997 5.48112L12.2425 6.42393L7.99984 10.6666L3.7572 6.42393L4.70002 5.48112L7.99984 8.78094Z" />
  </svg>
);

export default SVGChevron;
