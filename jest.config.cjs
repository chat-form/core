const { join } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest',
  rootDir: join(__dirname, './'),
  cacheDirectory: join(__dirname, './node_modules/.jest/cache'),
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  bail: 1,
  testTimeout: 20 * 1000,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!**/*.d.{ts,tsx}'],
  transform: { '^.+\\.(j|t)sx?$': 'ts-jest' },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|svg)(\\?as=url)?$':
      '<rootDir>/test/utils/svg-transform.js',
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/test/utils/file-transform.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^.+\\.module.(css|sass|scss|less)$': 'identity-obj-proxy',
  },
}
