import React, {type ReactElement} from 'react';

interface Props {
  fill?: string
  className?: string
}
const SVGHome = ({fill = '#4B5563', className}: Props): ReactElement => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill={fill} d="M10.8333 15.833H15.8333V8.31488L10 3.77784L4.16667 8.31488V15.833H9.16667V10.833H10.8333V15.833ZM17.5 16.6664C17.5 17.1266 17.1269 17.4997 16.6667 17.4997H3.33333C2.8731 17.4997 2.5 17.1266 2.5 16.6664V7.90731C2.5 7.65015 2.61873 7.4074 2.82172 7.24951L9.48842 2.06433C9.78933 1.83028 10.2107 1.83028 10.5116 2.06433L17.1782 7.24951C17.3812 7.4074 17.5 7.65015 17.5 7.90731V16.6664Z" />
  </svg>
);

export default SVGHome;
