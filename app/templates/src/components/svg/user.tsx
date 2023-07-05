import React, {type ReactElement} from 'react';

interface Props {
  fill?: string
  className?: string
}
const SVGUser = ({fill = '#4B5563', className}: Props): ReactElement => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1666 10.8333C16.0075 10.8333 17.5 12.3257 17.5 14.1667C17.5 16.0076 16.0075 17.5 14.1666 17.5C12.3257 17.5 10.8333 16.0076 10.8333 14.1667H9.16663C9.16663 16.0076 7.67424 17.5 5.83329 17.5C3.99234 17.5 2.49996 16.0076 2.49996 14.1667C2.49996 12.3257 3.99234 10.8333 5.83329 10.8333C7.06706 10.8333 8.14427 11.5036 8.72063 12.4999H11.2793C11.8556 11.5036 12.9329 10.8333 14.1666 10.8333ZM5.83329 12.5C4.91282 12.5 4.16663 13.2462 4.16663 14.1667C4.16663 15.0872 4.91282 15.8333 5.83329 15.8333C6.75377 15.8333 7.49996 15.0872 7.49996 14.1667C7.49996 13.2462 6.75377 12.5 5.83329 12.5ZM14.1666 12.5C13.2461 12.5 12.5 13.2462 12.5 14.1667C12.5 15.0872 13.2461 15.8333 14.1666 15.8333C15.0871 15.8333 15.8333 15.0872 15.8333 14.1667C15.8333 13.2462 15.0871 12.5 14.1666 12.5ZM13.3333 2.5C15.1742 2.5 16.6666 3.99238 16.6666 5.83333V8.33333H18.3333V10H1.66663V8.33333H3.33329V5.83333C3.33329 3.99238 4.82568 2.5 6.66663 2.5H13.3333ZM13.3333 4.16667H6.66663C5.78799 4.16667 4.99996 4.95833 4.99996 5.83333V8.33333H15V5.83333C15 4.9547 14.2083 4.16667 13.3333 4.16667Z" fill={fill} />
  </svg>
);

export default SVGUser;
