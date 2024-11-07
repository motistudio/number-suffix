import {pathsToModuleNameMapper} from 'ts-jest'

import {default as config} from './tsconfig.json' with {type: 'json'}

const {compilerOptions} = config

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.(spec|test).ts'],
  modulePaths: [compilerOptions.baseUrl].filter(Boolean),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}),
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  collectCoverage: true
}
