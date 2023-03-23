import { ComponentPropsWithoutRef, createElement } from 'react';
import classes from './heading.module.scss';

export type AllowedDomElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingProps<T extends AllowedDomElement> = {
  as?: T;
  facet?: 'primary' | 'secondary';
} & ComponentPropsWithoutRef<T>;

export const Heading = <T extends AllowedDomElement>({
  as,
  facet = 'secondary',
  children,
  ...rest
}: HeadingProps<T>) => {
  const element: AllowedDomElement = as || 'h1';

  return createElement(
    element,
    {
      ...rest,
      className: classes[`${element}-${facet}`],
    },
    children,
  );
};
