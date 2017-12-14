import { expect } from 'chai';

import { isObject } from '../../src/util/object';

describe('object', () => {
  describe('isObject', () => {
    it('should return true when an object is passed', () => {
      let a = { a: 1, b: 2 };
      let b = { a: { a: 1 }, b: 3 };

      expect(isObject(a)).to.be.true;
      expect(isObject(b)).to.be.true;
    });

    it('should return false if anything other than a javascript object is passed as input', () => {
      let a = 1;
      let b = [1, 2];
      let c = 'string';
      let d = () => 'test';

      expect(isObject(a)).to.be.false;
      expect(isObject(b)).to.be.false;
      expect(isObject(c)).to.be.false;
      expect(isObject(d)).to.be.false;
    });
  });
});
