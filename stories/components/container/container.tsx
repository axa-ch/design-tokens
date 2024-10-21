import type { FC, PropsWithChildren } from 'react';
import classes from './container.module.scss';

export type ContainerProps = PropsWithChildren;

export const Container: FC<ContainerProps> = ({ children, ...rest }) => (
  <div
    className={classes.container}
    {...rest}
  >
    {children}
  </div>
);
