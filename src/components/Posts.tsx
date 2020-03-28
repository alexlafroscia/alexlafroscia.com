import React, { HTMLProps, FC } from 'react';
import cx from '@sindresorhus/class-names';
import Post, { PostLike, SeriesLike } from './Post';

type PostsProps = HTMLProps<HTMLDivElement> & {
  posts: PostLike[];
  series?: SeriesLike[];
};

const Posts: FC<PostsProps> = ({ className, posts, series: allSeries = [], ...rest }) => {
  return (
    <div className={cx('grid', 'md:grid-cols-2', 'gap-px', 'bg-steel', className)} {...rest}>
      {posts.map((post) => {
        const series = allSeries.find(
          (series) => post.frontmatter.series && series.slug === post.frontmatter.series.slug
        );

        return (
          <div className="py-8 bg-white md:odd:pr-4 md:even:pl-4 dark:bg-dark-blue" key={post.id}>
            <Post className="h-full" post={post} series={series} />
          </div>
        );
      })}
      {posts.length % 2 === 1 && <div className="bg-white dark:bg-dark-blue" />}
    </div>
  );
};

export default Posts;
