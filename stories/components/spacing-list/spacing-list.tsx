import { CSSProperties, FC } from 'react';
import { sortBy } from 'lodash';
import * as Spacing from '../../../build/js/spacing';
import classes from './spacing-list.module.scss';

const sortedSpacings = sortBy(Object.values(Spacing));

export const SpacingList: FC = () => (
  <ul className={classes.list}>
    {sortedSpacings.map((value, index) => (
      <li
        className={classes.item}
        key={index}
      >
        <span>{value}px</span>
        <figure
          style={
            {
              '--spacing': `var(--spacing-base-${index + 1})`,
            } as CSSProperties
          }
        />
      </li>
    ))}
  </ul>
);
