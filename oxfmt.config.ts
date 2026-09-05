import { defineConfig } from 'oxfmt'

export default defineConfig({
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  sortImports: true,
  sortPackageJson: true,
  sortTailwindcss: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  ignorePatterns: ['node_modules', '.git', '.husky', '.vscode', 'dist', 'build', '.knip.jsonc', '.agents'],
})
