import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['eslint', 'import', 'jsdoc', 'node', 'oxc', 'promise', 'typescript', 'unicorn'],
  ignorePatterns: ['node_modules', '.git', '.husky', '.vscode', 'dist', 'build'],
  rules: {
    'unicorn/no-empty-file': 'error',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          kebabCase: true,
        },
      },
    ],
  },
})
