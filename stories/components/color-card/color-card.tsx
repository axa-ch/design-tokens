import { CSSProperties, FC } from 'react';
import classes from './color-card.module.scss';
import { startCase } from 'lodash';

export type ColorCardProps = {
  name: string;
  value: string;
};

/**
 * Primary UI component for user interaction
 */
export const ColorCard: FC<ColorCardProps> = ({ name, value }) => (
  <div
    className={classes.container}
    style={
      {
        '--bg': `var(--${name})`,
      } as CSSProperties
    }
  >
    <figure className={classes.preview}></figure>
    <h1 className={classes.name}>{startCase(name.replace(/color-(misc|ui-design|base|status)|color-/, ''))}</h1>
    <h2 className={classes.value}>{value}</h2>
    <h3 className={classes.variableName}>{name}</h3>
  </div>
);
