import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import cx from "@sindresorhus/class-names";

const SeriesInner = styled.div`
  background-color: var(--theme-secondary-background-color);
  border-radius: 3px;
  margin-bottom: 3em;
  padding: 1.5em;

  @media (min-width: 900px) {
    margin-bottom: 0;
    margin-left: 2em;
  }

  b {
    padding-left: 0.1em;
  }

  ol {
    margin-bottom: 0;
  }
`;

const Title = styled.span`
  display: flex;
  justify-content: space-between;
`;

const ToggleButton = styled.button`
  align-self: flex-end;
  height: 2em;
  line-height: 2em;
  padding: 0 1em;

  &::before {
    margin-right: 0 !important;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const Content = styled.div`
  display: ${({ open }: { open: boolean }) => (open ? "block" : "none")};
  margin-top: 1em;

  @media (min-width: 900px) {
    display: block;
    margin-top: 0.5em;
  }
`;

const Series: FC = ({ children, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <SeriesInner {...rest}>
      <Title>
        <b>More in this Series</b>
        <ToggleButton
          className={cx("icon", open ? "icon-caret-down" : "icon-caret-left")}
          onClick={() => {
            setOpen(!open);
          }}
        />
      </Title>
      <Content open={open}>{children}</Content>
    </SeriesInner>
  );
};

export default Series;
