import type {Unit} from '../types/commons.t'

import getNumberDevider from './getNumberDivider'
import getUnitDevision from './getUnitDevision'

/**
 * Returns a divider by either a number or a string
 * @param {String|Number} num - either a number or a string of thousand, million, billion or trillion. Case insensitive.
 * @returns {Number}
 */
const getDivider = (num: Unit | Uppercase<Unit> | number): number => {
  return typeof num === 'string' ? getUnitDevision(num.toLowerCase() as Unit) : getNumberDevider(num)
}

export default getDivider
