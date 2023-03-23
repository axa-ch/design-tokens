import { ComponentPropsWithoutRef, createElement } from 'react';
import clsx from 'clsx';
import classes from './text.module.scss';

export type AllowedDomElement = 'p' | 'div' | 'span' | 'li' | 'ol' | 'dd' | 'dt';
export type TextProps<T extends AllowedDomElement> = {
  as?: T;
  facet?: 'text-1' | 'text-2' | 'text-3' | 'text-4';
} & ComponentPropsWithoutRef<T>;

export const Text = <T extends AllowedDomElement>({ as, facet = 'text-1', children, ...rest }: TextProps<T>) => {
  const element: AllowedDomElement = as || 'p';

  return createElement(
    element,
    {
      ...rest,
      className: clsx(classes.text, classes[facet]),
    },
    children,
  );
};
