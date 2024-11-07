import {dividers} from '../constants'

import getNumberLength from './getNumberLength'

/**
 * Return the devision value for formatting numbers
 * @example
 * 1,234 -> 1,000
 * 12,345 -> 1,000
 * 1,234,567 -> 1,000,000
 * 1,234,5678 -> 1,000,000
 * @param {Number} num - a number
 * @returns {Number} - a number to divide with
 */
const getNumberDevider = (num: number): number => {
  const zeros = (getNumberLength(num) - 1)
  if (zeros < 3) {
    return dividers['thousand']
  } else if (zeros > 12) {
    return dividers['trillion']
  }
  return Math.pow(10, ~~(zeros / 3) * 3)
}

export default getNumberDevider
