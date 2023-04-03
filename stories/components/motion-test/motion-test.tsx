import { FC } from 'react';
import clsx from 'clsx';
import classes from './motion-test.module.scss';

export type MotionTestProps = {
  size: 'small' | 'medium' | 'large';
  easing: 'accelerated' | 'decelerated' | 'standard';
};

export const MotionTest: FC<MotionTestProps> = ({ size, easing }) => (
  <figure className={clsx(classes.wrapper, classes[size], classes[easing])}>
    <span />
  </figure>
);
