import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';

import {
  DateRangePicker,
  DateRangePickerProps,
  DateRangePickerQuickSelectionItem,
  DateRangePickerValue,
} from '..';

function formatValue(date?: Date) {
  return date ? moment(date).format('MMM DD, YYYY') : '';
}

const today = moment()
  .startOf('day')
  .hours(12)
  .toDate();

const dateRangePickerQuickSelectionItems: DateRangePickerQuickSelectionItem[] = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
].map(daysCount => ({
  label: `${daysCount} days`,
  value: [
    today,
    moment(today)
      .add(daysCount - 1, 'days')
      .toDate(),
  ],
}));

const DateRangeInputComponent: DateRangePickerProps['InputComponent'] = ({ value, ...props }) => {
  const [startDate, endDate] = value ? value : [];
  const formattedValue =
    startDate || endDate ? `${formatValue(startDate)} - ${formatValue(endDate)}` : '';
  return <input value={formattedValue} {...props} />;
};

export function DateRangePickerDemo() {
  const [range, setRange] = useState<DateRangePickerValue>();
  const [disabled, setDisabled] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const [hasQuickSelection, setHasQuickSelection] = useState(false);

  return (
    <Box p={2}>
      <Grid container={true} spacing={1}>
        <Grid item={true} sm={true} xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">State</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel
                label="Disabled"
                control={<Switch />}
                checked={disabled}
                onChange={(_, checked) => setDisabled(checked)}
              />

              <FormControlLabel
                label="With Footer"
                control={<Switch />}
                checked={hasFooter}
                onChange={(_, checked) => setHasFooter(checked)}
              />

              <FormControlLabel
                label="With Quick Selection"
                control={<Switch />}
                checked={hasQuickSelection}
                onChange={(_, checked) => setHasQuickSelection(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>

      <DateRangePicker
        value={range}
        onChange={setRange}
        numberOfMonths={2}
        disabledDays={!disabled ? undefined : { before: today }}
        quickSelectionItems={!hasQuickSelection ? undefined : dateRangePickerQuickSelectionItems}
        InputComponent={DateRangeInputComponent}
        footer={
          hasFooter && (
            <Typography color="textSecondary">
              Selected date range allows preferred carriers to instantly book loads inside the Super
              Loadboard.
              <br />
              Dates out of selected range will still be available to request.
            </Typography>
          )
        }
      />

      <pre>{JSON.stringify({ range }, null, 2)}</pre>
    </Box>
  );
}