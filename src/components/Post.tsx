import React, { FC, HTMLProps } from 'react';
import cx from '@sindresorhus/class-names';

import Link from '../elements/a';

type PostProps = {
  post: PostLike;
} & HTMLProps<HTMLDivElement>;

const Post: FC<PostProps> = ({ post, className = undefined, ...rest }) => (
  <article className={cx('flex', 'flex-col', 'items-start', className)} {...rest}>
    <h3 className="mb-2 text-lg font-bold">
      {post.frontmatter.title || post.frontmatter.series.title}
    </h3>
    <p className="flex-grow mb-8">{post.frontmatter.description}</p>
    <Link
      href={post.fields.slug}
      className="px-4 py-1 text-xs font-bold uppercase rounded shadow text-dark-blue bg-blue hover:shadow-md"
    >
      Read It!
    </Link>
  </article>
);

export default Post;

export interface PostLike {
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    description: string;
    series?: {
      title: string;
    };
  };
}
