import React from "react";
import styled from "@emotion/styled";

import { Link as BaseLink } from "../elements";

const Footer = styled.footer`
  border-top: 1px solid var(--theme-divider-color);
  display: grid;
  grid-template-areas: "previous pointer next";
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

export const Link = ({ children, ...props }) => (
  <BaseLink className="button primary small" {...props}>
    {children}
  </BaseLink>
);

export default ({ currentPage, totalPages, next, previous }) => (
  <Footer>
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
