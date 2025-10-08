# Formata — the schema-driven form builder

> Beautiful, universal, JSON Schema–driven forms built with web components, powered by Lit / FAST, styled with Tailwind.

Formata is a lightweight yet powerful form builder that renders dynamic forms directly from JSON Schema definitions.  
It works everywhere — React, Svelte, Vue, or plain HTML — because it’s built on native Custom Elements.

---

## Features

- JSON Schema–based  
  Generate full CRUD forms from standard JSON Schema (draft 2020-12)  
  Supports oneOf, allOf, conditional logic, defaults, and dependencies

- Framework-agnostic  
  Runs in any environment that supports Web Components (React, Svelte, Vue, Astro…)

- Beautiful by default  
  Styled with TailwindCSS and CSS Custom Properties  
  Inspired by Shadcn/UI and Shoelace

- Extensible  
  Plug-and-play field renderers: register your own web components for custom input types  
  Built-in support for async/autocomplete fields (remote data fetching)

- Validated  
  Uses AJV for schema validation (sync + async)

- Storage-agnostic  
  Works seamlessly with schemaless databases (MongoDB, PocketBase, etc.)  
  Optional schema inference tools

---

## Architecture overview

```
 ┌────────────────────────────┐
 │       Your App (any)       │
 │  React / Svelte / Vanilla  │
 └────────────┬───────────────┘
              │
      (Web Components)
              │
 ┌────────────┴────────────┐
 │   Form Renderer Core    │ ← parses JSON Schema + UI hints
 │    - Layout engine      │
 │    - Field registry     │
 │    - Validation (AJV)   │
 └────────────┬────────────┘
              │
        (Schema + Data)
              │
   ┌──────────┴──────────┐
   │ Mongo / PocketBase  │
   │  or REST / GraphQL  │
   └─────────────────────┘
```

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Import in HTML

```html
<script type="module" src="/dist/my-web-components.es.js"></script>

<my-component name="Developer"></my-component>
```

### Use in JavaScript

```javascript
import { MyComponent } from "./dist/my-web-components.es.js";

// Components auto-register on import
```

## Building Components

1. Create new component in `src/wc/`

```svelte
<svelte:options customElement="my-element" />

<script lang="ts">
  export let value: string;
</script>

<div>Hello {value}</div>
```

2. Add to `src/wc/web-components.ts`

```typescript
export { default as MyElement } from "./MyElement.wc.svelte";
```

3. Rebuild with `npm run build`

## Package Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start dev server with HMR         |
| `npm run build`   | Build production-ready components |
| `npm run preview` | Locally preview production build  |
| `npm run check`   | Validate TypeScript types         |

## Technical Stack

**Core Technologies**

- Svelte 5 (custom elements)
- TypeScript 5
- Vite 6

**Optimization Features**

- Double minification (Terser + esbuild)
- Tree-shaking enabled
- CSS auto-scoping
- Dead code elimination
- Gzip-ready outputs

## File Structure

```
├── src/
│   ├── wc/                   # Web components
│   │   ├── MyComponent.wc.svelte
│   │   └── web-components.ts # Component registry
│   ├── lib/                  # Svelte components
│   ├── App.svelte            # Demo application
│   └── main.ts               # Entry point
├── vite.config.ts            # Build configuration
└── svelte.config.js          # Svelte compiler settings
```

## License

Copyright ©️ 2025 Forkbomb bv - Amsterdam NL

This project is distributed under the [GNU Affero General Public License v3.0](./LICENSE-AGPL).

It is based on [svelte-webcomponent](https://github.com/dariuszsikorski/svelte-webcomponent)
by [Dariusz Sikorski](https://dariuszsikorski.pl)
(MIT License).  
Original copyright © 2023 Dariusz Sikorski.
