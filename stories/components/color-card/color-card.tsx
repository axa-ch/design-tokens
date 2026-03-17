import { type CSSProperties, type FC, useMemo } from 'react';
import clsx from 'clsx';
import { startCase } from 'lodash';
import classes from './color-card.module.scss';

export type ColorCardProps = {
  name: string;
  value: string;
  isDeprecated?: boolean;
};

/**
 * Primary UI component for user interaction
 */
export const ColorCard: FC<ColorCardProps> = ({ name, value, isDeprecated }) => {
  // format the color name making it human-readable
  const formattedName = useMemo(
    () => startCase(name.replace(/color-(misc|ui-design|base|status)|color-/, '')).replace('Axa', 'AXA'),
    [name],
  );
  return (
    <div
      className={clsx(classes.container, { [classes.deprecated]: isDeprecated })}
      style={
        {
          '--bg': `var(--${name})`,
        } as CSSProperties
      }
    >
      <figure className={classes.preview} />
      <h1 className={classes.name}>{formattedName}</h1>
      <h2 className={classes.value}>{value}</h2>
      <h3 className={classes.variableName}>{name}</h3>
      {isDeprecated ? <h3 className={classes.info}>Deprecated</h3> : null}
    </div>
  );
};
