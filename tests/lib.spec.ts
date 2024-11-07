'use strict'

import NumberSuffix, {getDivider, toFixed, styles, getStyle, addStyle} from '../src'

describe('NumberSuffix lib', () => {
  test('Should be a function', () => {
    expect(typeof NumberSuffix).toBe('function')
  })

  test('Should have its API', () => {
    expect(typeof NumberSuffix.styles).toBe('object')
    expect(typeof NumberSuffix.addStyle).toBe('function')
  })

  test('Should tell the correct devider by string', () => {
    expect(getDivider('thousand')).toBe(1e3)
    expect(getDivider('THOUSAND')).toBe(1e3)
    expect(getDivider('million')).toBe(1e6)
    expect(getDivider('MILLION')).toBe(1e6)
    expect(getDivider('billion')).toBe(1e9)
    expect(getDivider('BILLION')).toBe(1e9)
    expect(getDivider('trillion')).toBe(1e12)
    expect(getDivider('TRILLION')).toBe(1e12)
  })

  test('Should tell the correct devider by a number', () => {
    expect(getDivider(0)).toBe(1000) // '1,000 (k) for zero
    expect(getDivider(1e0)).toBe(1000) // '1,000 (k) for single digit'
    expect(getDivider(1e1)).toBe(1000) // '1,000 (k) for two digits'
    expect(getDivider(1e2)).toBe(1000) // '1,000 (k) for three digits'
    expect(getDivider(1e3)).toBe(1000) // '1,000 (k) for four digits'
    expect(getDivider(1e4)).toBe(1000) // '1,000 (k) for five digits'
    expect(getDivider(1e5)).toBe(1000) // '1,000 (k) for six digits'
    expect(getDivider(1e6)).toBe(1000000) // '1,000,000 (M) for seven digits (six zeros)'
    expect(getDivider(1e7)).toBe(1000000) // '1,000,000 (M) for eight digits (seven zeros)'
    expect(getDivider(1e8)).toBe(1000000) // '1,000,000 (M) for nine digits (eight zeros)'
    expect(getDivider(1e9)).toBe(1000000000) // '1,000,000,000 (G) for ten digits (nine zeros)'
    expect(getDivider(1e10)).toBe(1000000000) // '1,000,000,000 (G) for eleven digits (ten zeros)'
    expect(getDivider(1e11)).toBe(1000000000) // '1,000,000,000 (G) for twelve digits (eleven zeros)'
    expect(getDivider(1e12)).toBe(1000000000000) // '1,000,000,000,000 (T) for thirteen digits (twelve zeros)'
    expect(getDivider(1e16)).toBe(1000000000000) // '1,000,000,000,000 (T) for seventeen digits (sixteen zeros)'
  })

  test('Should get a fixed number string', () => {
    const number = 12.34
    expect(toFixed(number)).toBe('12') // '12 for 12.34'
    expect(toFixed(number, 1)).toBe('12.3') // '12.3 for 12.34 with one decimal point precision'
    expect(toFixed(number, 2)).toBe('12.34') // '12.34 for 12.34 with two decimal point precision'
    expect(toFixed(number, 3)).toBe('12.34') // '12.340 for 12.34 with three decimal point precision'
    expect(toFixed(12.3456, 3)).toBe('12.345') // '12.345 for 12.3456 with three decimal point precision'
  })

  test('Should add a new style', () => {
    const style = ['a', 'b', 'c', 'd']
    NumberSuffix.addStyle('abc', style)
    const savedStyle = NumberSuffix.getStyle('abc')
    expect(savedStyle.getSymbol('thousand')).toBe(style[0]) // 'style's thousands is correct'
    expect(savedStyle.getSymbol('million')).toBe(style[1]) // 'style's millions is correct'
    expect(savedStyle.getSymbol('billion')).toBe(style[2]) // 'style's billions is correct'
    expect(savedStyle.getSymbol('trillion')).toBe(style[3]) // 'style's trillions is correct'
  })

  test('Should format a number', () => {
    expect(NumberSuffix.format(1234)).toBe('1k') // '1k for 1,234'
    expect(NumberSuffix.format(12345)).toBe('12k') // '12k for 12,345'
    expect(NumberSuffix.format(123456)).toBe('123k') // '123k for 123,456'
    expect(NumberSuffix.format(1234567)).toBe('1M') // '1M for 1,234,567'
    expect(NumberSuffix.format(12345678)).toBe('12M') // '12M for 12,345,678'
    expect(NumberSuffix.format(123456789)).toBe('123M') // '123M for 123,456,789'
    expect(NumberSuffix.format(1234567891)).toBe('1G') // '1G for 1,234,567,891'
    expect(NumberSuffix.format(12345678910)).toBe('12G') // '12G for 12,345,678,910'
    expect(NumberSuffix.format(123456789101)).toBe('123G') // '123G for 123,456,789,101'
    expect(NumberSuffix.format(1234567891011)).toBe('1T') // '1T for 1,234,567,891,011'
  })

  test('Should format a number with precision', () => {
    const number = 1234
    expect(NumberSuffix.format(number, {})).toBe('1k') // '1k for 1,234 with no precision'
    expect(NumberSuffix.format(number, {precision: 0})).toBe('1k') // '1k for 1,234 with precision of 0'
    expect(NumberSuffix.format(number, {precision: 1})).toBe('1.2k') // '1.2k for 1,234 with precision of 1'
    expect(NumberSuffix.format(number, {precision: 2})).toBe('1.23k') // '1.23k for 1,234 with precision of 2'
    expect(NumberSuffix.format(number, {precision: 3})).toBe('1.234k') // '1.234k for 1,234 with precision of 3'
    expect(NumberSuffix.format(number, {precision: 4})).toBe('1.234k') // '1.234k for 1,234 with precision of 4'
    expect(NumberSuffix.format(12345, {precision: 4})).toBe('12.345k') // 1.2345k for 1,2345 with precision of 4. In general, precision > 3 is kind of meaningless unless we use a fixed measurement
  })

  test('Should format a fixed measurement', () => {
    expect(NumberSuffix.format(1234, {measurement: 'thousand'})).toBe('1k') // '1k for 1,234 as a thousand'
    expect(NumberSuffix.format(1234567, {measurement: 'thousand'})).toBe('1,234k') // '1234k for 1,234,567 as a thousand'
    expect(NumberSuffix.format(1234, {measurement: 'million'})).toBe('0M') // '0M for 1,234 as a million'
    expect(NumberSuffix.format(1234, {measurement: 'million', precision: 3})).toBe('0.001M') // '0.001M for 1,234 as a million'
  })

  test('Should format a different style', () => {
    expect(NumberSuffix.format(1e3, {style: 'abbreviation'})).toBe('1K') // '1K for 1,000 (abbreviation)'
    expect(NumberSuffix.format(1e6, {style: 'abbreviation'})).toBe('1M') // '1M for 1,000,000 (abbreviation)'
    expect(NumberSuffix.format(1e9, {style: 'abbreviation'})).toBe('1B') // '1B for 1,000,000,000 (abbreviation)'
    expect(NumberSuffix.format(1e12, {style: 'abbreviation'})).toBe('1T') // '1T for 1,000,000,000,000 (abbreviation)'
  })

  test('Should add a new style and format by it', () => {
    const style = ['K', 'MM', 'B', 'T']
    NumberSuffix.addStyle('newStyle', style)
    expect(NumberSuffix.format(1e3, {style: 'newStyle'})).toBe('1K') // '1K for 1,000 (newStyle)'
    expect(NumberSuffix.format(1e6, {style: 'newStyle'})).toBe('1MM') // '1MM for 1,000,000 (newStyle)'
    expect(NumberSuffix.format(1e9, {style: 'newStyle'})).toBe('1B') // '1B for 1,000,000,000 (newStyle)'
    expect(NumberSuffix.format(1e12, {style: 'newStyle'})).toBe('1T') // '1T for 1,000,000,000,000 (newStyle)'
  })

  test('Should create a new instance and format by it', () => {
    const numberSuffix = new NumberSuffix()
    expect(numberSuffix.format(1e3)).toBe('1k') // 'Formatting correctly using metric style'
    expect(numberSuffix.format(1e3, {style: 'abbreviation'})).toBe('1K') // 'Formatting correctly using abbreviation style'
  })

  test('Should create a new instance with default style', () => {
    const numberSuffix = new NumberSuffix({style: 'abbreviation'})
    expect(numberSuffix.format(1e3)).toBe('1K') // 'Formatting correctly using abbreviation style'
  })

  test('Should add a new style to an instance', () => {
    const numberSuffix = new NumberSuffix()
    expect(numberSuffix.format(1e3)).toBe('1k') // 'Formatting correctly using default metric style'
    numberSuffix.addStyle('newStyleName', ['K', 'MM', 'B', 'T'])
    expect(numberSuffix.format(1e6)).toBe('1M') // 'Still formatting using default style'
    expect(numberSuffix.format(1e6, {style: 'newStyleName'})).toBe('1MM') // 'Formatting correctly using the new style'
    numberSuffix.setDefaultStyle('newStyleName')
    expect(numberSuffix.format(1e6)).toBe('1MM') // 'Formatting correctly using the new style as default')
    numberSuffix.setOptions({style: 'metric'})
    expect(numberSuffix.format(1e6)).toBe('1M') // 'Using metric letters again')
  })

  test('Should set a fixed measurement to an instance', () => {
    const numberSuffix = new NumberSuffix()
    expect(numberSuffix.format(1e3)).toBe('1k') // Formatting using thousands
    expect(numberSuffix.format(1e6)).toBe('1M') // Formatting using millions
    numberSuffix.setOptions({measurement: 'thousand'})
    expect(numberSuffix.format(1e3)).toBe('1k') // Formatting using thousands
    expect(numberSuffix.format(1e6)).toBe('1,000k') // Formatting using thousands
  })

  test('Should set a fixed precision to an instance', () => {
    const numberSuffix = new NumberSuffix()
    expect(numberSuffix.format(1234)).toBe('1k') // Formatting using thousands
    expect(numberSuffix.format(1234567)).toBe('1M') // Formatting using millions
    numberSuffix.setOptions({precision: 2})
    expect(numberSuffix.format(1234)).toBe('1.23k') // Formatting using thousands
    expect(numberSuffix.format(1234567)).toBe('1.23M') // Formatting using millions
  })

  test('Should set options without param', () => {
    const numberSuffix = new NumberSuffix()
    expect(numberSuffix.format(1e3)).toBe('1k')
    numberSuffix.setOptions() // should be ok
    expect(numberSuffix.format(1e3)).toBe('1k')
  })

  test('Should format with a new instance using a fixed precision', () => {
    const numberSuffix = new NumberSuffix({precision: 2})
    expect(numberSuffix.format(1234)).toBe('1.23k') // 'Formatting correctly using default precision'
  })

  test('Should use global styles', () => {
    const style = ['k', 'M', 'G', 'T']
    const name = 'new-style-name'
    addStyle(name, style)
    expect(styles.get(name)?.symbols).toMatchObject(style)
    expect(getStyle(name)?.symbols).toMatchObject(style)
  })
})
