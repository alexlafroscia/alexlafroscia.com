import React, { FC } from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import styled from '@emotion/styled';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type SafeLinkProps = Omit<GatsbyLinkProps<{}>, 'ref' | 'style'>;
type LinkProps = Partial<SafeLinkProps> & {
  href?: string;
  newTab?: boolean;
};

/**
 * Borrowed from the Gatbsy docs to create a single `a` replacement component
 * that can correctly link to internal or external links
 *
 * Modified to...
 * 1. Use `href` to point to the URL (so that it plays nicely with Markdown)
 */
const Link: FC<LinkProps> = ({ children, href, activeClassName, newTab, ...rest }) => {
  const internal = /^\/(?!\/)/.test(href);

  if (newTab) {
    rest = {
      ...rest,
      target: '_blank',
      rel: 'noopener noreferrer'
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
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default styled(Link)`
  &.footnote-ref {
    margin-left: 0.3em;
  }
`;
