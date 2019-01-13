import React from "react";

export const Icon = ({ href, icon, children }) => (
  <li>
    <a href={href} className={`icon fa-${icon}`}>
      <span className="label">{children}</span>
    </a>
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
