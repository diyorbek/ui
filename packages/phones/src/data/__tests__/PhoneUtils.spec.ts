import {
  formatPhoneNumber,
  parsePhoneNumber,
  PhoneNumberFormat,
  PhoneNumberPair,
  validatePhoneNumber,
} from '../PhoneUtils';

test.each([
  ['', 'US', ''],
  ['(5', 'US', '5'],
  ['(50', 'US', '50'],
  ['(506', 'US', '506'],
  ['(506)', 'US', '506'],
  ['(506) ', 'US', '506'],
  ['(506) 2', 'US', '5062'],
  ['(506) 23', 'US', '50623'],
  ['(506) 234', 'US', '506234'],
  ['(506) 234-5', 'US', '506-2345'],
  ['(506) 23/4-56', 'US', '50623456'],
  ['(506) 234-567', 'US', '506234567'],
  ['(506) 234-5678', 'US', '(506) 234-5678'],
  ['(506) 234-5678 ', 'US', '(506) 234-5678'],
  ['(506) 234-5678 9', 'US', '50623456789'],
  ['(506) 234-5678 90', 'US', '506234567890'],
  ['1 (5', 'US', '15'],
  ['1 (50', 'US', '150'],
  ['1 (506', 'US', '1506'],
  ['1 (506)', 'US', '1506'],
  ['1 (506) ', 'US', '1506'],
  ['1 (506) 2', 'US', '15062'],
  ['1 (506) 23', 'US', '150623'],
  ['1 (506) 234', 'US', '1506234'],
  ['1 (506) 234-5', 'US', '15062345'],
  ['1 (506) 234-56', 'US', '150623456'],
  ['1 (506) 234-567', 'US', '1506234567'],
  ['1 (506) 234-5678', 'US', '(506) 234-5678'],
  ['1 (506) 234-5678 ', 'US', '(506) 234-5678'],
  ['1 (506) 234-5678 9', 'US', '50623456789'],
  ['1 (506) 234-5678 90', 'US', '506234567890'],
  ['+1 (5', 'US', '5'],
  ['+1 (50', 'US', '50'],
  ['+1 (506', 'US', '506'],
  ['+1 (506)', 'US', '506'],
  ['+1 (506) ', 'US', '506'],
  ['+1 (506) 2', 'US', '5062'],
  ['+1 (506) 23', 'US', '50623'],
  ['+1 (506) 234', 'US', '506234'],
  ['+1 (506) 234-5', 'US', '506-2345'],
  ['+1 (506) 234-56', 'US', '50623456'],
  ['+1 (506) 234-567', 'US', '506234567'],
  ['+1 (506) 234-5678', 'CA', '(506) 234-5678'],
  ['+1 (506) 234-5678 ', 'CA', '(506) 234-5678'],
  ['+1 (506) 234-5678 9', 'US', '50623456789'],
  ['+1 (506) 234-5678 90', 'US', '506234567890'],
])('parsePhoneNumber(%p): [%p, %p]', (input, country, nationalNumber) => {
  expect(parsePhoneNumber(input)).toEqual([country, nationalNumber]);
});

test.each<[string | PhoneNumberPair, undefined | PhoneNumberFormat, string]>([
  // Accepts a string
  ['', undefined, '+1'],
  ['(', undefined, '+1'],
  ['(5', undefined, '+15'],
  ['(50', undefined, '+150'],
  ['+1', undefined, '+1'],
  ['+1 (5', undefined, '+15'],
  ['+1 (50', undefined, '+150'],

  // Uses `e164` by default
  [['CA', ''], undefined, '+1'],
  [['CA', '('], undefined, '+1'],
  [['CA', '(5'], undefined, '+15'],
  [['CA', '(50'], undefined, '+150'],

  // Normalizes national number
  [['US', '!+@1#1$'], undefined, '+11'],
  [['NZ', '!+@1#1$'], undefined, '+6411'],

  // Normalizes the country
  [['??' as any, ''], undefined, '+1'],
  [['CACA' as any, ''], undefined, '+1'],

  [['CA', ''], 'e164', '+1'],
  [['CA', '('], 'e164', '+1'],
  [['CA', '(5'], 'e164', '+15'],
  [['CA', '(50'], 'e164', '+150'],
  [['CA', '(506'], 'e164', '+1506'],
  [['CA', '(506)'], 'e164', '+1506'],
  [['CA', '(506) '], 'e164', '+1506'],
  [['CA', '(506) 2'], 'e164', '+15062'],
  [['CA', '(506) 23'], 'e164', '+150623'],
  [['CA', '(506) 234'], 'e164', '+1506234'],
  [['CA', '(506) 234-'], 'e164', '+1506234'],
  [['CA', '(506) 234-5'], 'e164', '+15062345'],
  [['CA', '(506) 234-56'], 'e164', '+150623456'],
  [['CA', '(506) 234-567'], 'e164', '+1506234567'],
  [['CA', '(506) 234-5678'], 'e164', '+15062345678'],
  [['CA', '(506) 234-5678 9'], 'e164', '+150623456789'],
  [['CA', '(506) 234-5678 90'], 'e164', '+1506234567890'],

  [['CA', ''], 'rfc3966', 'tel:+1'],
  [['CA', '('], 'rfc3966', 'tel:+1'],
  [['CA', '(5'], 'rfc3966', 'tel:+1-5'],
  [['CA', '(50'], 'rfc3966', 'tel:+1-50'],
  [['CA', '(506'], 'rfc3966', 'tel:+1-506'],
  [['CA', '(506)'], 'rfc3966', 'tel:+1-506'],
  [['CA', '(506) '], 'rfc3966', 'tel:+1-506'],
  [['CA', '(506) 2'], 'rfc3966', 'tel:+1-5062'],
  [['CA', '(506) 23'], 'rfc3966', 'tel:+1-50623'],
  [['CA', '(506) 234'], 'rfc3966', 'tel:+1-506234'],
  [['CA', '(506) 234-'], 'rfc3966', 'tel:+1-506234'],
  [['CA', '(506) 234-5'], 'rfc3966', 'tel:+1-5062345'],
  [['CA', '(506) 234-56'], 'rfc3966', 'tel:+1-50623456'],
  [['CA', '(506) 234-567'], 'rfc3966', 'tel:+1-506234567'],
  [['CA', '(506) 234-5678'], 'rfc3966', 'tel:+1-506-234-5678'],
  [['CA', '(506) 234-5678 9'], 'rfc3966', 'tel:+1-50623456789'],
  [['CA', '(506) 234-5678 90'], 'rfc3966', 'tel:+1-506234567890'],

  [['CA', ''], 'national', ''],
  [['CA', '('], 'national', ''],
  [['CA', '(5'], 'national', '5'],
  [['CA', '(50'], 'national', '50'],
  [['CA', '(506'], 'national', '506'],
  [['CA', '(506)'], 'national', '506'],
  [['CA', '(506) '], 'national', '506'],
  [['CA', '(506) 2'], 'national', '5062'],
  [['CA', '(506) 23'], 'national', '50623'],
  [['CA', '(506) 234'], 'national', '506234'],
  [['CA', '(506) 234-'], 'national', '506234'],
  [['CA', '(506) 234-5'], 'national', '506-2345'],
  [['CA', '(506) 234-56'], 'national', '50623456'],
  [['CA', '(506) 234-567'], 'national', '506234567'],
  [['CA', '(506) 234-5678'], 'national', '(506) 234-5678'],
  [['CA', '(506) 234-5678 9'], 'national', '50623456789'],
  [['CA', '(506) 234-5678 90'], 'national', '506234567890'],

  [['CA', ''], 'international', '+1'],
  [['CA', '('], 'international', '+1'],
  [['CA', '(5'], 'international', '+1 5'],
  [['CA', '(50'], 'international', '+1 50'],
  [['CA', '(506'], 'international', '+1 506'],
  [['CA', '(506)'], 'international', '+1 506'],
  [['CA', '(506) '], 'international', '+1 506'],
  [['CA', '(506) 2'], 'international', '+1 5062'],
  [['CA', '(506) 23'], 'international', '+1 50623'],
  [['CA', '(506) 234'], 'international', '+1 506234'],
  [['CA', '(506) 234-'], 'international', '+1 506234'],
  [['CA', '(506) 234-5'], 'international', '+1 5062345'],
  [['CA', '(506) 234-56'], 'international', '+1 50623456'],
  [['CA', '(506) 234-567'], 'international', '+1 506234567'],
  [['CA', '(506) 234-5678'], 'international', '+1 506-234-5678'],
  [['CA', '(506) 234-5678 9'], 'international', '+1 50623456789'],
  [['CA', '(506) 234-5678 90'], 'international', '+1 506234567890'],
])('formatPhoneNumber(%p, %p): %p', (input, format, phone) => {
  expect(formatPhoneNumber(input, format)).toBe(phone);
});

test.each([
  ['', 'unknown'],
  ['6', 'unknown'],
  ['61', 'too-short'],
  ['615-9', 'too-short'],
  ['615-99', 'too-short'],
  ['615-994', 'too-short'],
  ['615-994-3', 'too-short'],
  ['615-994-33', 'too-short'],
  ['615-994-330', 'too-short'],
  ['615-994-3300', 'is-possible'],
  ['615-994-33001', 'too-long'],
  ['1 6', 'too-short'],
  ['1 61', 'too-short'],
  ['1 615-9', 'too-short'],
  ['1 615-99', 'too-short'],
  ['1 615-994', 'too-short'],
  ['1 615-994-3', 'too-short'],
  ['1 615-994-33', 'too-short'],
  ['1 615-994-330', 'too-short'],
  ['1 615-994-3300', 'is-possible'],
  ['1 615-994-33001', 'too-long'],
  ['+1 6', 'unknown'],
  ['+1 61', 'too-short'],
  ['+1 615-9', 'too-short'],
  ['+1 615-99', 'too-short'],
  ['+1 615-994', 'too-short'],
  ['+1 615-994-3', 'too-short'],
  ['+1 615-994-33', 'too-short'],
  ['+1 615-994-330', 'too-short'],
  ['+1 615-994-3300', 'is-possible'],
  ['+1 615-994-33001', 'too-long'],
])('validatePhoneNumber(%p): %p', (input, expected) => {
  expect(validatePhoneNumber(input)).toBe(expected);
});
