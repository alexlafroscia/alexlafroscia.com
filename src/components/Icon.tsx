import React from 'react';
import cx from '@sindresorhus/class-names';
import Link from '../elements/a';

export const Icon = ({ href, className = '', icon, children }) => {
  const id = 'icon-' + icon + '-' + Math.floor(Math.random() * 1000000);

  return (
    <Link href={href} className={cx('icon', `icon-${icon}`, className)} aria-labelledby={id}>
      <label id={id} className="hidden-from-screen">
        {children}
      </label>
    </Link>
  );
};

export const IconButton = ({ icon, children, className, ...rest }) => {
  const id = 'icon-' + icon + '-' + Math.floor(Math.random() * 1000000);

  return (
    <button
      className={cx('px-4 border-2 border-current rounded icon', `icon-${icon}`, className)}
      aria-labelledby={id}
      {...rest}
    >
      <label id={id} className="hidden-from-screen">
        {children}
      </label>
    </button>
  );
};
