import React, { FC, HTMLAttributes } from 'react';
import cx from '@sindresorhus/class-names';

type Props = {
  className?: string;
  as: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;

const PageWidth: FC<Props> = ({ className = undefined, as = 'div', ...rest }) => {
  const TagName = as;

  return (
    <TagName
      className={cx('box-content mx-auto max-w-readable px-4 sm:px-8', className)}
      {...rest}
    />
  );
};

export default PageWidth;

export function asPageWidth(tagName: keyof JSX.IntrinsicElements) {
  return function({ ...rest }) {
    return <PageWidth as={tagName} {...rest} />;
  };
}
