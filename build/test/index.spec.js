"use strict";
// Sample Tests
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var src_1 = require("../src");
describe('test', function () {
    it('should return message as "Hello World"', function () {
        chai_1.expect(src_1.hello()).to.equal('Hello World');
    });
});
//# sourceMappingURL=index.spec.js.map