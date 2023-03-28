import { FC } from 'react';
import classes from './motion-test.module.scss';
import clsx from 'clsx';

export type MotionTestProps = {
  size: 'small' | 'medium' | 'large';
  easing: 'accelerated' | 'decelerated' | 'standard';
};

export const MotionTest: FC<MotionTestProps> = ({ size, easing }) => (
  <figure className={clsx(classes.wrapper, classes[size], classes[easing])}>
    <span />
  </figure>
);
