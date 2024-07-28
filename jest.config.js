module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['<rootDir>/src/infra/helpers/prisma/prisma-helper-mock.ts'],
  coveragePathIgnorePatterns: [
    'src/.+/index.ts'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
