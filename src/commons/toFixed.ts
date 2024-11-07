/**
 * Returns a fixed number without rounding
 * (native function rounds the value)
 * @param {Number} num - a number
 * @param {Number} decimals - the number of digits after the dot
 * @returns {String}
 */
const toFixed = (num: number, precision: number = 0) => {
  // Shift decimal right by precision
  const factor = Math.pow(10, precision)
  // Truncate using Math.floor instead of rounding
  const truncated = Math.floor(Number(num) * factor) / factor
  
  const str = truncated.toFixed(precision)
  if (!str.includes('.')) {
    return str
  }
  return str.replace(/\.?0+$/, '')
}

export default toFixed
