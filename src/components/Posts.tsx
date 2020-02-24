import React, { HTMLProps, FC } from 'react';
import cx from '@sindresorhus/class-names';

type PostsProps = HTMLProps<HTMLDivElement>;

const Posts: FC<PostsProps> = ({ children, className, ...rest }) => (
  <div className={cx('posts', className)} {...rest}>
    {children}
  </div>
);

export default Posts;
