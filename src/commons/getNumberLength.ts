/**
 * Returns a length of digits for a number.
 * The mathematicle equivalation of String(num).length
 * @param {Number} num - a number
 * @returns {Number} - length
 */
const getNumberLength = (num: number): number => {
  return Math.trunc(Math.log10(Math.abs(num)) + 1)
}

export default getNumberLength
