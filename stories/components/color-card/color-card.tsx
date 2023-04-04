import { CSSProperties, FC, useMemo } from 'react';
import { startCase } from 'lodash';
import classes from './color-card.module.scss';

export type ColorCardProps = {
  name: string;
  value: string;
};

/**
 * Primary UI component for user interaction
 */
export const ColorCard: FC<ColorCardProps> = ({ name, value }) => {
  // format the color name making it human-readable
  const formattedName = useMemo(
    () => startCase(name.replace(/color-(misc|ui-design|base|status)|color-/, '')).replace('Axa', 'AXA'),
    [name],
  );
  return (
    <div
      className={classes.container}
      style={
        {
          '--bg': `var(--${name})`,
        } as CSSProperties
      }
    >
      <figure className={classes.preview}></figure>
      <h1 className={classes.name}>{formattedName}</h1>
      <h2 className={classes.value}>{value}</h2>
      <h3 className={classes.variableName}>{name}</h3>
    </div>
  );
};
