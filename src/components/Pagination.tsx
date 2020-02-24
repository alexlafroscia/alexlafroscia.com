import React, { ReactNode, HTMLProps, FC } from 'react';
import cx from '@sindresorhus/class-names';
import styled from '@emotion/styled';

import { Link } from '../elements';

const Footer = styled.footer`
  border-top: 1px solid var(--theme-divider-color);
  display: grid;
  grid-template-areas: 'previous pointer next';
  grid-template-columns: 1fr auto 1fr;
  padding: 2em 0;
`;

const Pointer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-area: pointer;
`;

const PreviousWrapper = styled.div`
  grid-area: previous;
`;

const NextWrapper = styled.div`
  grid-area: next;
  text-align: right;
`;

const BaseLink = ({ children, className = undefined, ...props }) => (
  <Link
    className={cx(
      'inline-flex items-center dark:text-blue hover:text-blue-dark dark-hover:text-white',
      className
    )}
    {...props}
  >
    {children}
  </Link>
);

export const NextLink = ({ children, ...props }) => (
  <BaseLink {...props}>
    {children}
    <svg
      className="w-5 h-5 ml-2 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z" />
    </svg>
  </BaseLink>
);

export const PreviousLink = ({ children, ...props }) => (
  <BaseLink {...props}>
    <svg
      className="w-5 h-5 mr-2 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z" />
    </svg>
    {children}
  </BaseLink>
);

type PaginationProps = {
  currentPage?: number;
  next?: () => ReactNode;
  previous?: () => ReactNode;
  totalPages?: number;
};

const Pagination: FC<PaginationProps & HTMLProps<HTMLDivElement>> = ({
  currentPage,
  totalPages,
  next,
  previous,
  ...rest
}) => (
  <Footer {...rest}>
    <PreviousWrapper>{previous ? previous() : undefined}</PreviousWrapper>
    {currentPage && totalPages ? (
      <Pointer>
        {currentPage} out of {totalPages}
      </Pointer>
    ) : (
      undefined
    )}
    <NextWrapper>{next ? next() : undefined}</NextWrapper>
  </Footer>
);

export default Pagination;
