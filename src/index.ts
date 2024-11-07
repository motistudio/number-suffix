'use strict'

import type {Unit, SuffixStyle} from './types/commons.t'
import type {
  FormatOptions,
  RuntimeOptions
} from './types/lib.t'

import NumberSuffix from './NumberSuffix'

import format from './commons/format'
import getDivider from './commons/getDivider'
import toFixed from './commons/toFixed'
import {styles, addStyle, getStyle} from './globals'

export default NumberSuffix

export {
  addStyle,
  getStyle,
  getDivider,
  format,
  styles,
  toFixed,
  type Unit,
  type SuffixStyle,
  type FormatOptions,
  type RuntimeOptions
}
