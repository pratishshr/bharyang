/**
 * Check if the supplied data is an object.
 *
 * @param {any} data
 * @returns {boolean}
 */
export function isObject(data: any) {
  return data instanceof Object && data.constructor === Object;
}
