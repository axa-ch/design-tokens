import type { FC } from 'react';
import { kebabCase } from 'lodash';
import { ColorCard } from '../color-card/color-card';
import classes from './color-list.module.scss';

export type ColorListProps = {
  colors: { name: string; value: string }[];
};

export const ColorList: FC<ColorListProps> = ({ colors }) => (
  <ul className={classes.list}>
    {colors.map(({ name, value }) => (
      <li
        className={classes.item}
        key={name}
      >
        <ColorCard
          name={kebabCase(name)}
          value={value}
        />
      </li>
    ))}
  </ul>
);
