import React from "react";
import styled from "@emotion/styled";

import Link from "../elements/a";

const Post = styled.article`
  display: flex;
  flex-direction: column;

  p {
    flex-grow: 1;
  }
`;

export default ({ children, className, post, ...rest }) => (
  <Post className={className} {...rest}>
    <h3>{post.frontmatter.title || post.frontmatter.series.title}</h3>
    <p>{post.frontmatter.description}</p>
    <ul className="actions">
      <li>
        <Link href={post.fields.slug} className="button">
          Read It!
        </Link>
      </li>
    </ul>
  </Post>
);