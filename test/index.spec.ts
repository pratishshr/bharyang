// Sample Tests

import { expect } from 'chai';

import { hello } from '../src';

describe('test', () => {
  it('should return message as "Hello World"', () => {
    expect(hello()).to.equal('Hello World');
  });
});
