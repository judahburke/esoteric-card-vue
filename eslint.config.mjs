import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginCypress from 'eslint-plugin-cypress';
import vueI18n from '@intlify/eslint-plugin-vue-i18n';
import { withVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { globalIgnores } from 'eslint/config';

export default withVueTs([
  globalIgnores([
    'logs',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    'pnpm-debug.log*',
    'lerna-debug.log*',
    'node_modules',
    '.DS_Store',
    'dist',
    'dist-ssr',
    'coverage',
    '*.local',
    '/cypress/videos/',
    '/cypress/screenshots/',
    '.vscode/*',
    '!.vscode/extensions.json',
    '.idea',
    '*.suo',
    '*.ntvs*',
    '*.njsproj',
    '*.sln',
    '*.sw?'
  ]),
  pluginJs.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  ...vueI18n.configs.recommended,
  skipFormatting,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      'vue-i18n': {
        localeDir: './src/assets/locales/*.json',
        messageSyntaxVersion: '^11.0.0',
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        }
      ],
      'no-constant-binary-expression': 'off',
      'no-empty-static-block': 'off',
      'no-unused-private-class-members': 'off'
    }
  },
  {
    files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
    ...pluginCypress.configs.recommended,
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
    },
  }
]);
