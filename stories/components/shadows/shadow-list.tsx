import classes from './shadow-list.module.scss';
import { FC } from 'react';
import { Text } from '../text/text';

export const ShadowList: FC = () => (
  <ul className={classes.list}>
    <li className={classes.item}>
      <Text facet={'text-4'}>Default</Text>
      <figure />
    </li>
    <li className={classes.item}>
      <Text facet={'text-4'}>High</Text>
      <figure />
    </li>
  </ul>
);
