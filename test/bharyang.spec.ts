import { expect } from 'chai';

import * as bharyang from '../src/bharyang';

describe('bharyang', () => {
  describe('sortAscending', () => {
    it('should rearrange lines in ascending order by length', () => {
      let input = 'Longer Word\nWord\nLong Word';
      let output = 'Word\nLong Word\nLonger Word';

      expect(bharyang.sortAscending(input)).to.equal(output);
    });
  });

  describe('sortDescending', () => {
    it('should rearrange lines in descending order by length', () => {
      let input = 'Longer Word\nWord\nLong Word';
      let output = 'Longer Word\nLong Word\nWord';

      expect(bharyang.sortDescending(input)).to.equal(output);
    });
  });

  describe('sortImports', () => {
    it('should sort asset imports', () => {
      let input = "import '../somelib.css';\nimport '../assets/style.css';\nimport '../public.css';";
      let output = "import '../public.css';\nimport '../somelib.css';\nimport '../assets/style.css';\n\n";

      expect(bharyang.sortImports(input)).to.equal(output);
    });

    it('should sort module imports', () => {
      let input =
        "import { isObject } from '../utils/object';\nimport * as stringUtil from '../utils/string';\nimport test from '../utils/test';";
      let output =
        "import test from '../utils/test';\nimport { isObject } from '../utils/object';\nimport * as stringUtil from '../utils/string';\n\n";

      expect(bharyang.sortImports(input)).to.equal(output);
    });

    it('should sort library imports', () => {
      let input = "import { expect } from 'chai';\nimport React from 'react';\nimport express from 'express';\n";
      let output = "import React from 'react';\nimport { expect } from 'chai';\nimport express from 'express';\n\n";

      expect(bharyang.sortImports(input)).to.equal(output);
    });

    it('should group and sort imports', () => {
      let input =
        "import './public.css';\nimport './style.css';\nimport { isObject } from '../utils/object';\nimport { expect } from 'chai';\nimport http from '../utils/http';\nimport get from 'lodash/get';\n";

      let output =
        "import './style.css';\nimport './public.css';\n\nimport get from 'lodash/get';\nimport { expect } from 'chai';\n\nimport http from '../utils/http';\nimport { isObject } from '../utils/object';\n\n";

      expect(bharyang.sortImports(input)).to.equal(output);
    });

    it('should sort in ascending order if its not a import statement', () => {
      let input = 'long test\nlonger test\ntest';
      let output = 'test\nlong test\nlonger test\n\n';

      expect(bharyang.sortImports(input)).to.equal(output);
    });
  });
});
