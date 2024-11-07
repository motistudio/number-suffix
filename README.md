# NumberSuffix

## What does it do?

`number-suffix` is a package for rounding numbers with a suffix for its zeros.
Example:
* 1,234 -> 1k
* 1,234,567 -> 1M

### Featues
* Precision
* Fixed measurement
* Adding more formatting styles. It supports by default:
  * Metric (default)
  * Abbreviation
* Support for the following units:
    1. thousand
    2. million
    3. billion
    4. trillion
    5. quadrillion
    6. quintillion

#### Why not using `number-abbreviate`, `numbr` or `numeraljs`?
Mainly because of the libraries usage. I needed something very generic to work with, which had to be fast and not creating any instances. The other libraries had either a limited API (which works well on the wide internet) or they're creating new objects for each format operation.
`number-abbreviate` was the closest thing I found that meets my expectation - but lacked one feature I needed: a fixed measurement for numbers.

Also, this library uses mainly mathematic function for calculations compared to other libraries that uses strings instead, leading to slower performance.

### Getting started

Basic installation:
```bash
npm i number-suffix --save
```

Basic importing, supports both CJS and MJS
```typescript
const NumberSuffix = require('number-suffix')
import NumberSuffix from 'number-suffix'
import {format} from 'number-suffix'
```

### Usage

Basic usage:
```typescript
NumberSuffix.format(1234) // 1k
NumberSuffix.format(1234567) // 1M
NumberSuffix.format(1e9) // 1G
NumberSuffix.format(1e12) // 1T
```

Precision:
```typescript
NumberSuffix.format(1234, {precision: 2}) // 1.23k
NumberSuffix.format(1234567, {precision: 2}) // 1.23M
```

Fixed measurement:
Supports: 'thousand', 'million', 'billion', 'trillion', 'quadrillion' and 'quintillion'.
```typescript
NumberSuffix.format(1234567, {measurement: 'thousand'}) // 1234k
NumberSuffix.format(1234, {precision: 3, measurement: 'million'}) // 0.001M
```

Abbreviation:
```typescript
NumberSuffix.format(1e3, {style: 'abbreviation'}) // 1K
NumberSuffix.format(1e9, {style: 'abbreviation'}) // 1B
```

And adding and using a new style:
```typescript
NumberSuffix.addStyle('yourStyleName', ['Thousand', 'Million', 'Billion', 'Trillion'])
NumberSuffix.format(1e6, {style: 'yourStyleName'}) // 1Million
```
If there are null values it will lean on the metric style as a fallback.

## Instance
You can create an instance of NumberSuffix for more specific usage without using global settings.
```typescript
const numberSuffix = new NumberSuffix({...})
```

You can use fixed options in addition to the ones you have:
```typescript
const numberSuffix = new NumberSuffix({style: 'abbreviation'})
numberSuffix.format(1e3) // 1K
```
```typescript
const numberSuffix = new NumberSuffix({precision: 2})
numberSuffix.format(1234) // 1.23k
```
```typescript
const numberSuffix = new NumberSuffix({measurement: 'thousand'})
numberSuffix.format(1234567) // 1234k
```

And, of course, to override them for even more specific usage:
```typescript
const numberSuffix = new NumberSuffix({measurement: 'thousand'})
numberSuffix.format(1234567, {measurement: 'million'}) // 1M
```

You can add your own style as well with
```typescript
const numberSuffix = new NumberSuffix()
numberSuffix.addStyle('myStyle', ['T', 'M', 'B', 'T'])
numberSuffix.setDefaultStyle('myStyle')
```

To change the fixed options you can just:
```typescript
const numberSuffix = new NumberSuffix()
numberSuffix.setOptions({...})
```
