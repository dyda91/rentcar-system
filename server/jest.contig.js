module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).[tj]s?(x)'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    moduleNameMapper: {
      '^\\.*': '<rootDir>/src/$1',
    },
  };