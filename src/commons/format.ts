import type {FormatOptions} from '../types/lib.t'

import {DEFAULT_OPTIONS} from '../constants'
import StyleCollection from '../StyleCollection'
import getDivider from './getDivider'
import getNumberUnit from './getNumberUnit'
import toFixed from './toFixed'
import formatDigits from './formatDigits'
import {styles} from '../globals'

/**
 * Formats a number
 * @param {Number} number - a number
 * @param {Object} options - options object
 * @param {String} options.measurement - a fixed number group (like formatting a million with a thousands format)
 * @param {Number} options.precision - a precision after the dot (the difference between 2K and 2.56K)
 * @param {Object} options.collection - a style collection to use instead of the global one
 * @param {String} options.style - a specific style to use
 * @returns {String} - the formatted number
 */
const format = (number: number, options: Partial<FormatOptions> = DEFAULT_OPTIONS): string => {
  const formatted = number / getDivider(options.measurement ? options.measurement : number)
  const fixed = formatDigits(toFixed(formatted, options.precision || 0))
  const collection = options.collection instanceof StyleCollection ? options.collection : styles
  const symbol = (options.measurement ? collection.getSymbol(options.measurement) : collection.getSymbol(getNumberUnit(number), options.style))
  return fixed + symbol
}

export default format
