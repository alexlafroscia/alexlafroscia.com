import React from 'react';
import cx from '@sindresorhus/class-names';

export function asSectionHeader(Tag) {
  return ({ className = undefined, ...rest }) => {
    return (
      <Tag
        className={cx('inline-block text-lg pb-1 pr-4 font-bold border-b-2 border-blue', className)}
        {...rest}
      />
    );
  };
}
