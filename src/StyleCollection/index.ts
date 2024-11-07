import type {Unit} from '../types/commons.t'
import type {StyleCollection as IStyleCollection} from '../types/lib.t'

import {styles} from '../constants'

import Style from './Style'

/**
 * StyleCollection data model
 */
class StyleCollection implements IStyleCollection {
  public styles: Record<string, Style>
  public default: keyof typeof this.styles

  constructor () {
    this.styles = {
      'metric': new Style(styles.metric),
      'abbreviation': new Style(styles.abbreviation)
    }
    this.default = 'metric'
  }

  /**
   * adds a style to the collection by an array
   * @param {Array<String>} style - an array with four or more strings
   * @example
   * add('metric', ['k', 'M', 'G', 'T'])
   * add('abbreviation', ['K', 'M', 'B', 'T'])
   */
  add (name: string, symbols: string[]) {
    this.styles[name] = new Style(symbols)
    return this
  }

  /**
   * Returns a style by name
   * @param {String} name - the style name
   * @returns {Style} - the style
   */
  get (name: string) {
    return this.styles[name]
  }

  /**
   * Returns the symbol of a number by a style
   * @param {String} group - the number group - thousand, million, billion etc.
   * @param {String} style - a style name for formatting
   * @returns {String}
   */
  getSymbol (unit: Unit, style = this.default) {
    return this.get(style).getSymbol(unit)
  }

  /**
   * Sets the default style name
   * @param {String} name - the style's name
   * @returns {Object} - return the collection object (chainable)
   */
  setDefault (name: string) {
    this.default = name
    return this
  }

  /**
   * Returns the default style name
   */
  getDefault () {
    return this.default
  }

  static Style = Style
}

export default StyleCollection
