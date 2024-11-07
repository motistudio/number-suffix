/**
 * Formats digits
 * @example
 * formatDigits(1000) // '1,000'
 * @param {number} num - Any number
 * @returns {string}
 */
const formatDigits = (num: number | string) => {
  const numStr = String(num)

  // Split number into integer and decimal parts
  const [intPart, decPart] = numStr.split('.')

  // Add commas to integer part
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Return formatted number with decimal part if it exists
  return decPart ? `${formattedInt}.${decPart}` : formattedInt
}

export default formatDigits
