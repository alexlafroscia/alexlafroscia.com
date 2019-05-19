import React from "react";
import styled from "@emotion/styled";

import Link from "../elements/a";

export const Icon = ({ href, icon, children }) => {
  const id = "icon-" + icon + "-" + Math.floor(Math.random() * 1000000);

  return (
    <li>
      <Link
        href={href}
        className={`icon icon-${icon}`}
        aria-labelledby={id}
        newTab
      >
        <label id={id} className="label">
          {children}
        </label>
      </Link>
    </li>
  );
};

const InnerIconButton = styled.button`
  font-size: 1em;
  padding: 0 1.5em;
  height: 2.5em;
  line-height: 2.5em;

  &:before {
    margin: 0 auto !important;
  }
`;

export const IconButton = ({ icon, children, className, ...rest }) => {
  const id = "icon-" + icon + "-" + Math.floor(Math.random() * 1000000);

  return (
    <li>
      <InnerIconButton
        className={`button icon icon-${icon} ${className}`}
        aria-labelledby={id}
        {...rest}
      >
        <label id={id} className="label">
          {children}
        </label>
      </InnerIconButton>
    </li>
  );
};

export const Logo = ({ href = "/", children }) => (
  <Link href={href} className="logo">
    {children}
  </Link>
);

export default ({ logo, children }) => (
  <header id="header">
    {logo ? logo() : undefined}
    <ul className="icons">{children}</ul>
  </header>
);
