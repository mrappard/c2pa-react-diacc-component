# c2pa-react-diacc-component

A plugin for [c2pa-react-component](https://github.com/matthewrappard/c2pa-react-component) that renders the `diacc.pctf.conformance` assertion from a C2PA manifest.

## Requirements

This package is a plugin for `c2pa-react-component`. Install both:

```bash
npm install c2pa-react-diacc-component c2pa-react-component
```

### Peer dependencies

| Package | Version |
|---|---|
| `react` | `^18.0.0 \|\| ^19.0.0` |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` |

## CSS

Import the stylesheet once at the root of your app:

```ts
import "c2pa-react-diacc-component/style.css";
```

## Usage

Pass `DIACCManifest` as a plugin to the `C2paManifest` component from `c2pa-react-component`:

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

## Component

### `DIACCManifest`

Renders DIACC PCTF conformance data from a C2PA manifest at a configurable level of detail.

```tsx
import { DIACCManifest } from "c2pa-react-diacc-component";

<DIACCManifest manifest={verificationOutcome} level={1} />
```

#### Assertion

The component reads this assertion:

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

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `manifest` | `VerificationOutcome` | required | Verification result from the C2PA SDK |
| `level` | `1 \| 2 \| 3` | `1` | Initial disclosure level |
| `className` | `string` | - | CSS class applied when no active manifest is found |

#### Disclosure levels

| Level | What is shown |
|---|---|
| `1` | Compact card: assertion name/title, claim generator, thumbnail or initials badge |
| `2` | Extends level 1 with description and conformance entries |
| `3` | Full DIACC assertion view with label, name, description, and structured conformance entry details |

Clicking "More Info" advances from level 1 to 2 to 3. Clicking "Small View" at level 3 returns to level 1.

## Local Development

```bash
npm run dev
npm run build
npm test
```

## License

MIT
