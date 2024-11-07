'use strict'

import type {Unit} from '../types/commons.t'
import type {
  FormatOptions,
  RuntimeOptions
} from '../types/lib.t'

import {DEFAULT_OPTIONS} from '../constants'
import StyleCollection from '../StyleCollection'
import {styles, addStyle, getStyle} from '../globals'
import getDivider from '../commons/getDivider'
import toFixed from '../commons/toFixed'
import format from '../commons/format'

class NumberSuffix {
  public styleCollection: StyleCollection
  public precision: number
  public measurement: Unit | undefined

  /**
   * @constructor
   */
  constructor (options: Partial<RuntimeOptions> = {}) {
    this.styleCollection = new StyleCollection()
    this.precision = options.precision || 0
    this.measurement = options.measurement
    if (options.style) {
      this.styleCollection.setDefault(options.style)
    }
  }

  /**
   * Formats a number by the definitions
   * @param {Number} number - a number
   * @param {Object} options - extra options if needed
   * @returns {String}
   */
  format (number: number, options?: Partial<FormatOptions>) {
    const settings: Partial<FormatOptions> = {
      style: this.styleCollection.getDefault(),
      precision: this.precision,
      measurement: this.measurement,
      collection: this.styleCollection,
      ...options
    }
    return format(number, settings)
  }

  /**
   * Adds a style to the collection by an array
   * @param {Array<String>} style - an array with four or more strings
   * @example
   * addStyle('metric', ['k', 'M', 'G', 'T'])
   * addStyle('abbreviation', ['K', 'M', 'B', 'T'])
   */
  addStyle (...args: Parameters<StyleCollection['add']>) {
    this.styleCollection.add(...args)
    return this
  }

  setDefaultStyle (name: string) {
    this.styleCollection.setDefault(name)
    return this
  }

  setOptions (options?: Partial<RuntimeOptions>) {
    const {precision, measurement, style} = (options || DEFAULT_OPTIONS) as Partial<RuntimeOptions>
    this.precision = precision || this.precision || 0
    this.measurement = measurement || this.measurement
    if (style) {
      this.styleCollection.setDefault(style)
    }
  }

  static addStyle = addStyle

  static getStyle = getStyle

  static getDivider = getDivider

  static format = format

  static styles = styles

  static toFixed = toFixed
}

export default NumberSuffix
