module.exports = {
    preset: 'ts-jest',
    bail: 1,
    verbose: true,
    silent: false,
    testEnvironment: 'jsdom',
    testURL: 'https://jest.test',
    moduleFileExtensions: ['js', 'ts'],

    testMatch: ['<rootDir>/src/**/__test__/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/__test__/**'],
    snapshotSerializers: ['miniprogram-simulate/jest-snapshot-plugin']
}
