import React from "react";

import ExternalLink from "../components/ExternalLink";
import Link from "../elements/a";

export const Icon = ({ href, icon, children }) => {
  const id = "icon-" + icon + "-" + Math.floor(Math.random() * 1000000);

  return (
    <li>
      <ExternalLink
        href={href}
        className={`icon fa-${icon}`}
        aria-labelledby={id}
      >
        <label id={id} className="label">
          {children}
        </label>
      </ExternalLink>
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
