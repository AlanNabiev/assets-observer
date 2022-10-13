# Assets-observer

Assets observer frontend applications.

## Stack:

- `Vue3`/`Vue-router` - framework.
- `tsyringe` - dependency injection container for TypeScript.
- `vite` - packager and devtools make building and development lightning fast.
- `axios` - promise based HTTP client.
- `unplugin-vue-components` - on-demand components auto importing for Vite.
- `unplugin-auto-import/vue` - auto import APIs on-demand for Vite and with ts support.
- `windicss` is fully compatible with Tailwind CSS, but faster with vite.
- `tailwindcss-classnames` built-in with type-safe class names.
- `prettier` and `eslint` configured, enabled and formatting your code on save.

## Features

- [x] UI components system
- [x] Clean architecture
- [x] Displaying a List of Assets [CoinCap Api](https://docs.coincap.io/)
- [x] Cache assets, and cache first, then request strategy
- [x] Filters and cache applied filters
- [x] The ability to add/remove a card to favorites.
- [x] Show favorites on a separate page.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Local launch

1. Install dependencies with `npm i`
2. Run the server with `npm run dev`

## Available Scripts

- `npm run dev` — runs the app in the development mode
- `npm run build` — builds the app for production to the `docs` folder
- `npm run lint` — checks if the code is linted
- `npm run format` — format code style
- `npm run generate-css-types` — generates the CSS types for `tailwind-css`
- `npm run type-check` - vue 3 command line Type-Checking tool
