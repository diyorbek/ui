import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  GridItemsAlignment,
  GridJustification,
  GridSpacing,
  MenuItem,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { Color, GridStack, InlineGrid } from '@superdispatch/ui';
import React, { useState } from 'react';

export default function GridsDemo() {
  const [items, setItems] = useState(3);
  const [spacing, setSpacing] = useState<GridSpacing>(2);
  const [justify, setJustify] = useState<GridJustification>('flex-start');
  const [alignItems, setAlignItems] = useState<GridItemsAlignment>('stretch');

  const [dynamicWidth, setDynamicWidth] = useState(false);

  return (
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <Grid container={true} spacing={2}>
            <Grid item={true}>
              <FormControl>
                <FormLabel>Child</FormLabel>
                <FormGroup row={true}>
                  <FormControlLabel
                    checked={dynamicWidth}
                    label="Dynamic Width"
                    control={<Switch />}
                    onChange={(_, checked) => setDynamicWidth(checked)}
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item={true} xs={true}>
              <Typography gutterBottom={true}>Items</Typography>
              <Slider
                min={1}
                max={10}
                step={1}
                marks={true}
                valueLabelDisplay="auto"
                value={items}
                onChange={(_, value) => setItems(value as number)}
              />
            </Grid>

            <Grid item={true} xs={true}>
              <Typography gutterBottom={true}>Spacing</Typography>
              <Slider
                min={0}
                max={10}
                step={1}
                marks={true}
                valueLabelDisplay="auto"
                value={spacing}
                onChange={(_, value) => setSpacing(value as GridSpacing)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item={true} xs={6}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12}>
              <Typography variant="h3" gutterBottom={true}>
                InlineGrid
              </Typography>
            </Grid>

            <Grid item={true} xs={12}>
              <TextField
                select={true}
                label="Justification"
                value={justify}
                onChange={event =>
                  setJustify(event.target.value as GridJustification)
                }
              >
                {[
                  'flex-start',
                  'center',
                  'flex-end',
                  'space-between',
                  'space-around',
                  'space-evenly',
                ].map(value => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item={true} xs={12}>
              <div style={{ width: 256 }}>
                <InlineGrid
                  spacing={spacing}
                  justify={justify}
                  style={{ backgroundColor: Color.Silver500 }}
                >
                  {Array.from({ length: items }, (_, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${Color.Blue500}`,
                        backgroundColor: Color.Blue200,
                        height: 64,
                        width: !dynamicWidth ? 64 : (idx + 1) * 24,
                      }}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </InlineGrid>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item={true} xs={6}>
          <Grid container={true} spacing={2}>
            <Grid item={true}>
              <Typography variant="h3" gutterBottom={true}>
                GridStack
              </Typography>
            </Grid>

            <Grid item={true} xs={12}>
              <TextField
                select={true}
                label="Alignment"
                value={alignItems}
                onChange={event =>
                  setAlignItems(event.target.value as GridItemsAlignment)
                }
              >
                {[
                  'flex-start',
                  'center',
                  'flex-end',
                  'stretch',
                  'baseline',
                ].map(value => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item={true} xs={12}>
              <div style={{ width: 256, backgroundColor: Color.Silver500 }}>
                <GridStack spacing={spacing} alignItems={alignItems}>
                  {Array.from({ length: items }, (_, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${Color.Blue500}`,
                        backgroundColor: Color.Blue200,
                        height: 64,
                        width: '100%',
                        minWidth: !dynamicWidth ? 64 : (idx + 1) * 24,
                      }}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </GridStack>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}