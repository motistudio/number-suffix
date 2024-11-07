import getNumberLength from '../src/commons/getNumberLength'
import getUnitDevision from '../src/commons/getUnitDevision'
import getNumberDivider from '../src/commons/getNumberDivider'
import toFixed from '../src/commons/toFixed'
import formatDigits from '../src/commons/formatDigits'

describe('Basic math behind the scenes', () => {
  describe('Numbers length', () => {
    expect(getNumberLength(1)).toBe(1)
    expect(getNumberLength(10)).toBe(2)
    expect(getNumberLength(100)).toBe(3)
    expect(getNumberLength(1e3)).toBe(4)
    expect(getNumberLength(1e4)).toBe(5)
  })

  describe('Dividers & Units', () => {
    test('Should a divider by unit', () => {
      expect(getUnitDevision('thousand')).toBe(1e3)
      expect(getUnitDevision('million')).toBe(1e6)
      expect(getUnitDevision('billion')).toBe(1e9)
      expect(getUnitDevision('trillion')).toBe(1e12)
      expect(getUnitDevision('quadrillion')).toBe(1e15)
      expect(getUnitDevision('quintillion')).toBe(1e18)
    })

    test('Should get a divider for a number', () => {
      expect(getNumberDivider(1)).toBe(1000)
      expect(getNumberDivider(1234)).toBe(1000)
    })
  })

  describe('Basic formatting', () => {
    test('Should make a number fixed', () => {
      expect(toFixed(1, 2)).toBe('1')
      expect(toFixed(1.2, 2)).toBe('1.2')
      expect(toFixed(1.23, 2)).toBe('1.23')
      expect(toFixed(1.234, 2)).toBe('1.23')
    })

    test('Should format a number', () => {
      expect(formatDigits(0.1)).toBe('0.1')
      expect(formatDigits(1)).toBe('1')
      expect(formatDigits(12)).toBe('12')
      expect(formatDigits(123)).toBe('123')
      expect(formatDigits(1234)).toBe('1,234')
    })
  })
})
