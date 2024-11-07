import type {Unit} from '../types/commons.t'

import {dividers} from '../constants'

/**
 * Returns the number group devision for a number
 * @example
 * 'thousand' -> 1,000
 * 'million' -> 1,000,000
 * @param {String} unit - a unit
 * @returns {Number} - a number to divide with
 */
const getUnitDevision = (unit: Unit) => {
  return dividers[unit]
}

export default getUnitDevision
