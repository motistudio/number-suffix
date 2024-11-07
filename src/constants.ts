'use strict'

import type {Unit, SuffixStyle} from './types/commons.t'

export const styles: Record<string, SuffixStyle> = {
  metric: ['k', 'M', 'G', 'T', 'P', 'E'],
  abbreviation: ['K', 'M', 'B', 'T', 'q', 'Q']
}

/**
 * Deviders by number size
 * @constant
 * @private
 */
export const dividers: Record<Unit, number> = {
  'thousand': 1e3,
  'million': 1e6,
  'billion': 1e9,
  'trillion': 1e12,
  'quadrillion': 1e15,
  'quintillion': 1e18
}

/**
 * Units
 */
export const units: Unit[] = ['thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion']

/**
 * Default empty options, set ahead to save up memory
 */
export const DEFAULT_OPTIONS = {}
