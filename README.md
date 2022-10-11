# esoteric-card-vue

This is an open-source web app hosted on GitHub Pages based in Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## About Tools

- Documentation
  - Vue's [official documentation](https://vuejs.org)
- Tooling
  - Served and bundled with [Vite](https://vitejs.dev/guide/features.html)
  - Recommended IDE is [VSCode](https://code.visualstudio.com) + [Volar](https://github.com/johnsoncodehk/volar)
  - Testing with [Cypress](https://www.cypress.io/), specifically for [Components](https://on.cypress.io/component)
- Ecosystem
  - Store with [Pinia](https://pinia.vuejs.org/)
  - Navigation with [Vue Router](https://test-utils.vuejs.org/)
  - Testing with [Vue Test Utils](https://github.com/vuejs/devtools)
  - More tools at [Awesome Vue](https://github.com/vuejs/awesome-vue)
- Community
  - Discord at [Vue Land](https://chat.vuejs.org)
  - [StackOverflow](https://stackoverflow.com/questions/tagged/vue.js)
  - Subscribe to [mailing list](https://news.vuejs.org)
  - Follow official [@vuejs](https://twitter.com/vuejs)
- Support
  - [Become a sponsor]

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
