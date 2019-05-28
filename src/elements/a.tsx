import React, { FC } from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import styled from "@emotion/styled";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type SafeLinkProps = Omit<GatsbyLinkProps<any>, "ref" | "style">;
type LinkProps = Partial<SafeLinkProps> & {
  href?: string;
  newTab?: boolean;
};

const ASSET_EXTENSIONS = [".xml"];
function isAsset(href: string): boolean {
  return ASSET_EXTENSIONS.some(extension => href.endsWith(extension));
}

/**
 * Borrowed from the Gatbsy docs to create a single `a` replacement component
 * that can correctly link to internal or external links
 *
 * Modified to...
 * 1. Use `href` to point to the URL (so that it plays nicely with Markdown)
 * 2. Use `OutboundLink` for Google Analytics for external URLs
 */
const Link: FC<LinkProps> = ({
  children,
  href,
  activeClassName,
  newTab,
  ...rest
}) => {
  const internal = /^\/(?!\/)/.test(href);

  if (newTab) {
    rest = {
      ...rest,
      target: "_blank",
      rel: "noopener noreferrer"
    };
  }

  // Use a regular old anchor if we're linking to some static asset
  if (isAsset(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
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