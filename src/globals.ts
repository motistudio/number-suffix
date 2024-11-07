import StyleCollection from './StyleCollection'

/**
 * Global style collection object
 */
export const styles = new StyleCollection()

/**
 * Adds a style
 * @param {Array<String>} style - an array with four or more strings
 * @example
 * addStyle('metric', ['k', 'M', 'G', 'T'])
 * addStyle('abbreviation', ['K', 'M', 'B', 'T'])
 */
export const addStyle = (name: string, symbols: string[]) => {
  styles.add(name, symbols)
}

export const getStyle = (name: string) => {
  return styles.get(name)
}
