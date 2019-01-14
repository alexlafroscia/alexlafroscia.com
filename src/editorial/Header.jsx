import React from "react";

import ExternalLink from "../components/ExternalLink";

export const Icon = ({ href, icon, children }) => (
  <li>
    <ExternalLink href={href} className={`icon fa-${icon}`}>
      <span className="label">{children}</span>
    </ExternalLink>
  </li>
);

export const Logo = ({ href = "/", children }) => (
  <a href={href} className="logo">
    {children}
  </a>
);

export default ({ logo, children }) => (
  <header id="header">
    {logo ? logo() : undefined}
    <ul className="icons">{children}</ul>
  </header>
);
