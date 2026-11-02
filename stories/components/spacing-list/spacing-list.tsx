import type { CSSProperties, FC } from 'react';
import { dimension } from '../../../build/js/tokens.js';
import classes from './spacing-list.module.scss';

const sortedDimensions = Object.entries(dimension).sort(
  ([left], [right]) => Number(left) - Number(right),
);

export const SpacingList: FC = () => (
  <ul className={classes.list}>
    {sortedDimensions.map(([name, value]) => (
      <li
        className={classes.item}
        key={name}
      >
        <span>{`dimension.${name}: ${value}px`}</span>
        <figure
          style={
            {
              '--spacing': `calc(var(--axa-dimension-${name}) * 1px)`,
            } as CSSProperties
          }
        />
      </li>
    ))}
  </ul>
);
