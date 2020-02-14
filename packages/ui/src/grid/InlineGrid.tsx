import { Grid, GridProps } from '@material-ui/core';
import React, {
  Children,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

export interface InlineGridProps
  extends RefAttributes<HTMLDivElement>,
    Pick<
      GridProps,
      'style' | 'className' | 'children' | 'wrap' | 'spacing' | 'justify'
    > {}

export const InlineGrid: ForwardRefExoticComponent<InlineGridProps> = forwardRef(
  (
    {
      children,
      wrap = 'wrap' as const,
      justify = 'flex-start' as const,
      ...props
    },
    ref,
  ) => {
    const items = Children.toArray(children);

    return (
      <Grid {...props} ref={ref} wrap={wrap} justify={justify} container={true}>
        {items.map((item, idx) => (
          <Grid key={idx} item={true} zeroMinWidth={true}>
            {item}
          </Grid>
        ))}
      </Grid>
    );
  },
);
