import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';

/**
 * Generates a class reference name using BEM convention.
 *
 * @param {string} block - the block reference
 * @param {string|array} elem - the element reference
 * @param {string} modifier - the modifier refernece
 * @return {string}
 */
export function getBem (block, elem = null, modifier = '') {

  // Make sure parent value was provided.
  if (isNil(block)) console.error('Parent does not exist, but required.');

  let result = block;

  if (elem !== null && elem !== '') {
    if (isString(elem)) {
      result += '__' + elem; // Assign elem

    } else if (isArray(elem)) {
      forEach(elem, (e) => {
        result += '__' + e; // Assign elem
      });
    }
  }

  if (modifier !== '') result += '--' + modifier; // Assign modifier

  return result;
}
