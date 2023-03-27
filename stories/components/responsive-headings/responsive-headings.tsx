import { FC, PropsWithChildren } from 'react';
import classes from './responsive-headings.module.scss';

export type ResponsiveHeadingsProps = PropsWithChildren;

export const ResponsiveHeadings: FC<ResponsiveHeadingsProps> = ({ children, ...rest }) => (
  <div
    className={classes.container}
    {...rest}
  >
    {children}
  </div>
);
