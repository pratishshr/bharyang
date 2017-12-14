import { sort as sortArray, sortKeys, sortOrder } from 'sort-o';

import { isObject } from './util/object';

const regEx: RegEx = {
  assets: /^import \'.*?\'/,
  libraries: /(?!\'\..*\')\'.*?\'/
};

const MODULE_REGEX = /\'.*?\'/;

/**
 * Sort string with respect to the supplied sortOrder.
 *
 * @param {string} text
 * @param {string} sortOrder
 * @returns {string}
 */
function sort(text: string, sortOrder: string) {
  let lines = text.split('\n');

  return sortArray(lines, sortOrder)
    .filter(l => l)
    .join('\n');
}

/**
 * Group assets, libraries and app modules.
 *
 * @param {Import} acc
 * @param {string} line
 * @returns {Import}
 */
function groupLines(acc: Import, line: string) {
  for (let key of Object.keys(regEx)) {
    if (regEx[key].test(line)) {
      acc[key] = acc[key] || [];
      acc[key].push(line);
      return acc;
    }
  }

  let moduleKey: string;
  let matches = line.match(MODULE_REGEX) || [];

  if (matches.length) {
    let module = matches[0].replace(/\'/g, '');
    moduleKey = module.substring(0, module.lastIndexOf('/'));
  } else {
    moduleKey = 'misc';
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
function sortLines(lineGroup: Import) {
  let sortedLines: string[] = [];

  for (let key of Object.keys(lineGroup)) {
    let lines: string[] = [];

    if (isObject(lineGroup[key])) {
      lines = sortLines(lineGroup[key]);
    } else {
      lines = sortArray(lineGroup[key], sortOrder.ASC_LENGTH);
    }

    if (lines.length) {
      sortedLines = sortedLines.concat(lines);
      sortedLines.push('\n');
    }
  }

  return sortedLines;
}

/**
 * Sort lines in ascending order.
 *
 * @param {string} text
 * @returns {string}
 */
export function sortAscending(text: string) {
  return sort(text, sortOrder.ASC_LENGTH);
}

/**
 * Sort lines in descending order.
 *
 * @param {string} text
 * @returns {string}
 */
export function sortDescending(text: string) {
  return sort(text, sortOrder.DESC_LENGTH);
}

/**
 * Group and sort imports in ascending order.
 *
 * @param {string} text
 * @returns {string}
 */
export function sortImports(text: string) {
  let sortedLines: string[];
  let lines = text.split('\n');
  let lineGroup = lines.filter(l => l).reduce(groupLines, {
    assets: [],
    libraries: [],
    appModules: {}
  });

  sortedLines = sortLines(lineGroup);

  return sortedLines.join('\n').replace(/\n\n/g, '\n');
}
