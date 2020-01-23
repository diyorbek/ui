import {
  makeStyles,
  MenuItem,
  MenuItemClassKey,
  MenuItemProps,
  Theme,
  Typography,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useMemo,
} from 'react';

import { PhoneNumber, PhoneRegionCode } from './data/PhoneNumber';
import { phoneFieldCountries } from './internal/PhoneMetadata';
import { PhoneFieldFlag } from './PhoneFieldFlag';

export type PhoneFieldMenuItemClassKey = MenuItemClassKey | 'flag';

const useStyles = makeStyles<Theme, {}, PhoneFieldMenuItemClassKey>(
  theme => ({
    dense: {},
    gutters: {},
    root: {},
    selected: {},
    flag: { marginRight: theme.spacing(1) },
  }),
  { name: 'SuperDispatchPhoneFieldMenuItem' },
);

export interface PhoneFieldMenuItemProps
  extends RefAttributes<HTMLLIElement>,
    Omit<MenuItemProps, 'classes' | 'children'> {
  regionCode: PhoneRegionCode;
  classes?: Partial<ClassNameMap<PhoneFieldMenuItemClassKey>>;
}

export const PhoneFieldMenuItem: ForwardRefExoticComponent<PhoneFieldMenuItemProps> = forwardRef<
  HTMLLIElement,
  PhoneFieldMenuItemProps
>(({ regionCode, classes, ...props }, ref) => {
  const { flag: flagClassName, ...styles } = useStyles({ classes });
  const countryCode = useMemo(() => PhoneNumber.getCountryCode(regionCode), [
    regionCode,
  ]);

  return (
    <MenuItem {...props} ref={ref} button={true} classes={styles}>
      <PhoneFieldFlag code={regionCode} className={flagClassName} />
      {phoneFieldCountries.get(regionCode)}
      &nbsp;
      <Typography color="textSecondary">{countryCode}</Typography>
    </MenuItem>
  );
});
