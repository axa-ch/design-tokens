import type { FC } from 'react';
import { dropShadow } from '../../../build/js/tokens.js';
import classes from './shadow-list.module.scss';
import { Text } from '../text/text';

export const ShadowList: FC = () => (
  <ul className={classes.list}>
    {Object.entries(dropShadow).map(([name, shadow]) => (
      <li
        className={classes.item}
        key={name}
      >
        <Text facet={'text-4'}>{`dropShadow.${name}`}</Text>
        <figure
          style={{
            boxShadow: `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px currentColor`,
          }}
        />
      </li>
    ))}
  </ul>
);
