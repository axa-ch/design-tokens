import { FC } from 'react';
import { ColorCard } from '../color-card/color-card';
import { kebabCase } from 'lodash';
import classes from './color-list.module.scss';

export type ColorListProps = {
  colors: [string, string][];
};

export const ColorList: FC<ColorListProps> = ({ colors }) => (
  <ul className={classes.list}>
    {colors.map(([name, value]) => (
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
