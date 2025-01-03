export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  globals: {
    'import.meta': {
      env: {
        VITE_API_BASE_URL: 'http://localhost:3000', // or whatever default you want to use for testing
      },
    },
  },
  "testMatch": [
    "<rootDir>/src/__tests__/**/*.test.{ts,tsx}"
  ]
};
