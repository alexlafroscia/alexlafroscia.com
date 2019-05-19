import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import styled from "@emotion/styled";

/**
 * Borrowed from the Gatbsy docs to create a single `a` replacement component
 * that can correctly link to internal or external links
 *
 * Modified to...
 * 1. Use `href` to point to the URL (so that it plays nicely with Markdown)
 * 2. Use `OutboundLink` for Google Analytics for external URLs
 */
const Link = ({ children, href, activeClassName, newTab, ...rest }) => {
  const internal = /^\/(?!\/)/.test(href);

  if (newTab) {
    rest = {
      ...rest,
      target: "_blank",
      rel: "noopener noreferrer"
    };
  }

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink to={href} activeClassName={activeClassName} {...rest}>
        {children}
      </GatsbyLink>
    );
  }
  return (
    <OutboundLink href={href} {...rest}>
      {children}
    </OutboundLink>
  );
};

export default styled(Link)`
  &.footnote-ref {
    margin-left: 0.3em;
  }
`;
