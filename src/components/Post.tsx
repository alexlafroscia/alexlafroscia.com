import React, { FC, HTMLProps } from 'react';
import cx from '@sindresorhus/class-names';

import Link from '../elements/a';

type PostProps = {
  post: PostLike;
  series?: SeriesLike;
} & HTMLProps<HTMLDivElement>;

const Post: FC<PostProps> = ({ post, series, className = undefined, ...rest }) => (
  <article className={cx('flex', 'flex-col', 'items-start', className)} {...rest}>
    <h3 className="mb-2 text-lg font-bold">{post.frontmatter.title}</h3>
    {series ? (
      <div className="w-full p-2 mb-2 text-sm rounded bg-gray-light dark:bg-blue-dark">
        Series:
        <Link href={`/series/${series.slug}/`} className="pl-1 font-bold">
          {series.name}
        </Link>
      </div>
    ) : (
      undefined
    )}
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
      slug: string;
    };
  };
}

export interface SeriesLike {
  slug: string;
  name: string;
}
