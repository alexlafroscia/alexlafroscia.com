import React, { Component } from "react";
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
  display: ${props => (props.open ? "block" : "none")};
  margin-top: 1em;

  @media (min-width: 900px) {
    display: block;
    margin-top: 0.5em;
  }
`;

export default class Series extends Component {
  state = {
    open: false
  };

  render() {
    const { name, children, ...rest } = this.props;
    const { open } = this.state;

    return (
      <SeriesInner {...rest}>
        <Title>
          <span>
            Series: <b>{name}</b>
          </span>
          <ToggleButton
            className={cx("icon", open ? "fa-caret-down" : "fa-caret-left")}
            onClick={() => {
              this.setState(state => ({ open: !state.open }));
            }}
          />
        </Title>
        <Content open={open}>{children}</Content>
      </SeriesInner>
    );
  }
}
