import { type CSSProperties, type FC, useMemo } from 'react';
import { startCase } from 'lodash';
import classes from './color-card.module.scss';

export type ColorCardProps = {
  name: string;
  value: string;
};

export const ColorCard: FC<ColorCardProps> = ({ name, value }) => {
  const formattedName = useMemo(() => startCase(name), [name]);

  return (
    <div
      className={classes.container}
      style={
        {
          '--bg': value,
        } as CSSProperties
      }
    >
      <figure className={classes.preview} />
      <h1 className={classes.name}>{formattedName}</h1>
      <h2 className={classes.value}>{value}</h2>
      <h3 className={classes.variableName}>{`--axa-${name}`}</h3>
    </div>
  );
};
