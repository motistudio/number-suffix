import format from '../src/commons/format'

describe('Formatting', () => {
  test('Should format a number', () => {
    expect(format(1234)).toBe('1k') // '1k for 1,234'
    expect(format(12345)).toBe('12k') // '12k for 12,345'
    expect(format(123456)).toBe('123k') // '123k for 123,456'
    expect(format(1234567)).toBe('1M') // '1M for 1,234,567'
    expect(format(12345678)).toBe('12M') // '12M for 12,345,678'
    expect(format(123456789)).toBe('123M') // '123M for 123,456,789'
    expect(format(1234567891)).toBe('1G') // '1G for 1,234,567,891'
    expect(format(12345678910)).toBe('12G') // '12G for 12,345,678,910'
    expect(format(123456789101)).toBe('123G') // '123G for 123,456,789,101'
    expect(format(1234567891011)).toBe('1T') // '1T for 1,234,567,891,011'
  })

  test('Should format a number with precision', () => {
    const number = 1234
    expect(format(number, {})).toBe('1k') // '1k for 1,234 with no precision'
    expect(format(number, {precision: 0})).toBe('1k') // '1k for 1,234 with precision of 0'
    expect(format(number, {precision: 1})).toBe('1.2k') // '1.2k for 1,234 with precision of 1'
    expect(format(number, {precision: 2})).toBe('1.23k') // '1.23k for 1,234 with precision of 2'
    expect(format(number, {precision: 3})).toBe('1.234k') // '1.234k for 1,234 with precision of 3'
    expect(format(number, {precision: 4})).toBe('1.234k') // '1.234k for 1,234 with precision of 4'
    expect(format(12345, {precision: 4})).toBe('12.345k') // 1.2345k for 1,2345 with precision of 4. In general, precision > 3 is kind of meaningless unless we use a fixed measurement
  })

  test('Should format a fixed measurement', () => {
    expect(format(1234, {measurement: 'thousand'})).toBe('1k') // '1k for 1,234 as a thousand'
    expect(format(1234567, {measurement: 'thousand'})).toBe('1,234k') // '1234k for 1,234,567 as a thousand'
    expect(format(1234, {measurement: 'million'})).toBe('0M') // '0M for 1,234 as a million'
    expect(format(1234, {measurement: 'million', precision: 3})).toBe('0.001M') // '0.001M for 1,234 as a million'
  })

  test('Should format a different style', () => {
    expect(format(1e3, {style: 'abbreviation'})).toBe('1K') // '1K for 1,000 (abbreviation)'
    expect(format(1e6, {style: 'abbreviation'})).toBe('1M') // '1M for 1,000,000 (abbreviation)'
    expect(format(1e9, {style: 'abbreviation'})).toBe('1B') // '1B for 1,000,000,000 (abbreviation)'
    expect(format(1e12, {style: 'abbreviation'})).toBe('1T') // '1T for 1,000,000,000,000 (abbreviation)'
  })

  test('Should format a float number', () => {
    expect(format(1000.3)).toBe('1k')
  })
})
