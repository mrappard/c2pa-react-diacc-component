# c2pa-react-diacc-component

React plugin for [`c2pa-react-component`](https://github.com/matthewrappard/c2pa-react-component) that displays DIACC PCTF conformance data from a C2PA manifest.

The component is intentionally DIACC-specific. It reads only the `diacc.pctf.conformance` assertion.

## What It Displays

The plugin looks for this assertion on the active C2PA manifest:

```ts
{
  label: "diacc.pctf.conformance",
  data: {
    name: title,
    description,
    conformance: conformance ?? []
  }
}
```

It also uses standard manifest fields for the surrounding card:

| Field | Purpose |
|---|---|
| `manifest.title` | Fallback title when the DIACC assertion has no `name` |
| `manifest.claimGenerator` | Displayed organization/tool name |
| `manifest.claimGeneratorInfo[0].name` | Fallback claim generator |
| `manifest.thumbnail` | Optional thumbnail image |

## Installation

```bash
npm install c2pa-react-diacc-component c2pa-react-component
```

Peer dependencies:

| Package | Version |
|---|---|
| `react` | `^18.0.0 \|\| ^19.0.0` |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` |

## Styles

Import the stylesheet once in your application:

```ts
import "c2pa-react-diacc-component/style.css";
```

For Next.js App Router, import it from `app/layout.tsx` or another global stylesheet entry point.

## Usage With c2pa-react-component

```tsx
import { C2paManifest } from "c2pa-react-component";
import { DIACCManifest } from "c2pa-react-diacc-component";
import type { VerificationOutcome } from "c2pa-react-component-types";
import "c2pa-react-diacc-component/style.css";

export function MediaCard({ outcome }: { outcome: VerificationOutcome }) {
  return (
    <C2paManifest
      manifest={outcome}
      plugin={[DIACCManifest]}
    />
  );
}
```

## Direct Component Usage

You can also render the plugin component directly when you already have a `VerificationOutcome`:

```tsx
import { DIACCManifest } from "c2pa-react-diacc-component";
import type { VerificationOutcome } from "c2pa-react-component-types";

export function DiaccPanel({ outcome }: { outcome: VerificationOutcome }) {
  return <DIACCManifest manifest={outcome} level={1} />;
}
```

## Props

`DIACCManifest` uses the plugin prop shape from `c2pa-react-component-types`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `manifest` | `VerificationOutcome` | required | C2PA verification result containing one or more manifests |
| `level` | `1 \| 2 \| 3` | `1` | Initial display level |
| `className` | `string` | - | Applied only to the fallback message when no active manifest exists |

## Display Levels

| Level | Display |
|---|---|
| `1` | Compact card with DIACC title/name, claim generator, and thumbnail or initials |
| `2` | Adds description and conformance entries |
| `3` | Adds assertion label, structured assertion fields, and expanded conformance details |

The "More Info" button advances from level 1 to 2 to 3. The "Small View" button at level 3 returns to level 1.

## Example Assertion

```json
{
  "diacc.pctf.conformance": {
    "name": "DIACC PCTF Conformance Example",
    "description": "Example conformance data for a DIACC Trust Registry manifest.",
    "conformance": [
      "Verified Person",
      "Verified Organization",
      {
        "profile": "PCTF",
        "component": "Digital Trust and Identity",
        "status": "conformant"
      }
    ]
  }
}
```

See [`examples/diacc-pctf-example.json`](examples/diacc-pctf-example.json) for a complete sample verification outcome.

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev playground:

```bash
npm run dev
```

Build the library:

```bash
npm run build
```

Run checks:

```bash
npm run lint
npm test
```

## Package Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Vite dev playground |
| `npm run build` | Type-checks and builds the library into `dist` |
| `npm run lint` | Runs ESLint over `src` |
| `npm test` | Runs Vitest |
| `npm run dev:lib` | Builds the library in watch mode |
| `npm run preview` | Previews the Vite app build |

## Published Files

The package exports:

| Export | Path |
|---|---|
| JavaScript module | `dist/c2pa-react-diacc-component.js` |
| CommonJS/UMD bundle | `dist/c2pa-react-diacc-component.umd.cjs` |
| Types | `dist/index.d.ts` |
| Stylesheet | `dist/c2pa-react-diacc-component.css` |

## License

MIT
