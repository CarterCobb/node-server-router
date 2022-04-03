import { Greeter } from '../index';
import { test, expect } from '@jest/globals';

test('main', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});
