import type {Unit, SuffixStyle} from '../types/commons.t'
import type {Style as IStyle} from '../types/lib.t'

import {units, styles} from '../constants'

/**
 * @class Style
 * @description A class to represent a style as an object
 */
class Style implements IStyle {
  public symbols: SuffixStyle
  public symbolsMap: Record<Unit, string>

  constructor (symbols: SuffixStyle) {
    this.symbols = symbols
    /**
     * Filling up units.
     * the object looks like this (sort of):
     * this.thousand = 'k'
     * this.million = 'M'
     */
    this.symbolsMap = units.reduce<Record<Unit, string>>((localSymbols, unit, index) => {
      localSymbols[unit] = symbols[index] || styles.metric[index]

      return localSymbols
    }, {} as Record<Unit, string>)
  }

  /**
   * Returns a symbol by a group
   * @param {String} group - a group ('thousand', 'million', etc)
   * @returns {String}
   */
  getSymbol (unit: Unit): string {
    return this.symbolsMap[unit]
  }
}

export default Style
