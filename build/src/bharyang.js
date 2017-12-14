"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sort_o_1 = require("sort-o");
var object_1 = require("./util/object");
var regEx = {
    assets: /^import \'.*?\'/,
    libraries: /(?!\'\..*\')\'.*?\'/
};
var MODULE_REGEX = /\'.*?\'/;
/**
 * Sort string with respect to the supplied sortOrder.
 *
 * @param {string} text
 * @param {string} sortOrder
 * @returns {string}
 */
function sort(text, sortOrder) {
    var lines = text.split('\n');
    return sort_o_1.sort(lines, sortOrder)
        .filter(function (l) { return l; })
        .join('\n');
}
/**
 * Group assets, libraries and app modules.
 *
 * @param {Import} acc
 * @param {string} line
 * @returns {Import}
 */
function groupLines(acc, line) {
    for (var _i = 0, _a = Object.keys(regEx); _i < _a.length; _i++) {
        var key = _a[_i];
        if (regEx[key].test(line)) {
            acc[key] = acc[key] || [];
            acc[key].push(line);
            return acc;
        }
    }
    var moduleKey;
    var matches = line.match(MODULE_REGEX) || [];
    if (matches.length) {
        var module = matches[0].replace(/\'/g, '');
        moduleKey = module.substring(0, module.lastIndexOf('/'));
    }
    else {
        moduleKey = line;
    }
    acc.appModules[moduleKey] = acc.appModules[moduleKey] || [];
    acc.appModules[moduleKey].push(line);
    return acc;
}
/**
 * Sort grouped modules in ascending order.
 *
 * @param {Import} lineGroup
 * @returns {string[]}
 */
function sortLines(lineGroup) {
    var sortedLines = [];
    for (var _i = 0, _a = Object.keys(lineGroup); _i < _a.length; _i++) {
        var key = _a[_i];
        var lines = [];
        if (object_1.isObject(lineGroup[key])) {
            lines = sortLines(lineGroup[key]);
        }
        else {
            lines = sort_o_1.sort(lineGroup[key], sort_o_1.sortOrder.ASC_LENGTH);
        }
        sortedLines = sortedLines.concat(lines);
        sortedLines.push('\n');
    }
    return sortedLines;
}
/**
 * Sort lines in ascending order.
 *
 * @param {string} text
 * @returns {string}
 */
function sortAscending(text) {
    return sort(text, sort_o_1.sortOrder.ASC_LENGTH);
}
exports.sortAscending = sortAscending;
/**
 * Sort lines in descending order.
 *
 * @param {string} text
 * @returns {string}
 */
function sortDescending(text) {
    return sort(text, sort_o_1.sortOrder.DESC_LENGTH);
}
exports.sortDescending = sortDescending;
/**
 * Group and sort imports in ascending order.
 *
 * @param {string} text
 * @returns {string}
 */
function sortImports(text) {
    var sortedLines;
    var lines = text.split('\n');
    var lineGroup = lines.filter(function (l) { return l; }).reduce(groupLines, {
        assets: [],
        libraries: [],
        appModules: {}
    });
    sortedLines = sortLines(lineGroup);
    return sortedLines.join('\n').replace(/\n\n/g, '\n');
}
exports.sortImports = sortImports;
//# sourceMappingURL=bharyang.js.map