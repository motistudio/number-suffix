import type {Unit} from '../types/commons.t'

import {units} from '../constants'

import getNumberLength from './getNumberLength'
import getNumberDevider from './getNumberDivider'

/**
 * Return the unit of the current number
 * @param {Number} num - a number
 * @example
 * 1,000 -> 'thousand'
 * 10,000 -> 'thousand'
 * 10,000,000 -> 'million'
 * @returns {String}
 */
const getNumberUnit = (num: number): Unit => {
  const devisionZeros = getNumberLength(getNumberDevider(num)) - 1
  return units[(devisionZeros / 3) - 1] as Unit
}

export default getNumberUnit
