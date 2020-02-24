import React, { FC, HTMLProps, useState } from 'react';
import styled from '@emotion/styled';
import cx from '@sindresorhus/class-names';

const SeriesInner = styled.div`
  background-color: var(--theme-secondary-background-color);
`;

type SeriesProps = { name: string } & HTMLProps<HTMLDivElement>;

const Series: FC<SeriesProps> = ({ name, className = '', children, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <SeriesInner className={cx('rounded-lg', 'p-4', 'lg:p-6', className)} {...rest}>
      <div className="flex items-center space-between">
        Series: <b className="flex-grow pl-2">{name}</b>
        <button
          className={cx(
            'icon',
            'border-2',
            'border-current',
            'text-blue',
            'w-8',
            'rounded',
            'lg:hidden',
            open ? 'icon-caret-down' : 'icon-caret-left'
          )}
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
      <div className={cx('mt-2', 'lg:block', open ? 'block' : 'hidden')}>{children}</div>
    </SeriesInner>
  );
};

export default Series;
