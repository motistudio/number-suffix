import type {Unit} from './commons.t'

export interface Style {
  getSymbol (unit: Unit): string
}

export interface StyleCollection {
  add (name: string, symbols: string[]): StyleCollection,
  get (name: string): Style
  getSymbol (unit: Unit, style?: string): string
  setDefault (name: string): StyleCollection
  getDefault (): string
}

export type FormatOptions = {
  measurement: Unit,
  precision: number,
  collection: StyleCollection,
  style: string
}

export type RuntimeOptions = Pick<FormatOptions, 'precision' | 'measurement' | 'style'>
