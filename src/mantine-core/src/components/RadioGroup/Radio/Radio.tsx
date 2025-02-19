import React, { forwardRef } from 'react';
import {
  mergeStyles,
  DefaultProps,
  MantineSize,
  MantineColor,
  ClassNames,
  useUuid,
} from '@mantine/styles';
import useStyles from './Radio.styles';

export type RadioStylesNames = Exclude<ClassNames<typeof useStyles>, 'labelDisabled'>;

export interface RadioProps
  extends DefaultProps<RadioStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  /** Radio label */
  children: React.ReactNode;

  /** Radio value */
  value: string;

  /** Active radio color from theme.colors */
  color?: MantineColor;

  /** Predefined label fontSize, radio width, height and border-radius */
  size?: MantineSize;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      style,
      id,
      children,
      size,
      title,
      disabled,
      color,
      classNames,
      styles,
      ...others
    }: RadioProps,
    ref
  ) => {
    const { classes, cx } = useStyles({ color, size }, classNames, 'radio-group');
    const _styles = mergeStyles(classes, styles);
    const uuid = useUuid(id);

    return (
      <div
        className={cx(classes.radioWrapper, className)}
        style={{ ...style, ..._styles.radioWrapper }}
        title={title}
      >
        <label
          className={cx(classes.label, { [classes.labelDisabled]: disabled })}
          htmlFor={uuid}
          style={_styles.label}
        >
          <input
            ref={ref}
            className={classes.radio}
            type="radio"
            id={uuid}
            disabled={disabled}
            style={_styles.radio}
            {...others}
          />
          <span>{children}</span>
        </label>
      </div>
    );
  }
);

Radio.displayName = '@mantine/core/Radio';
