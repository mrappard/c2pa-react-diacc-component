import { Manifest } from 'c2pa-react-component-types';

export const DIACC_PCTF_ASSERTION_LABEL = 'diacc.pctf.conformance';

export type DiaccPctfAssertion = {
  name?: string;
  description?: string;
  conformance?: unknown[];
};

export function getDiaccPctfAssertion(manifest: Manifest): DiaccPctfAssertion | undefined {
  return manifest.assertions?.[DIACC_PCTF_ASSERTION_LABEL] as DiaccPctfAssertion | undefined;
}

export function getDisplayTitle(manifest: Manifest, assertion?: DiaccPctfAssertion): string {
  return assertion?.name || manifest.title || 'Untitled';
}

export function getClaimGenerator(manifest: Manifest): string {
  return manifest.claimGenerator ?? manifest.claimGeneratorInfo?.[0]?.name ?? 'Unknown';
}

export function getInitials(value: string): string {
  return value.split(' ').filter(Boolean).map(n => n[0].toUpperCase()).join('') || '?';
}

export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(item => formatValue(item)).filter(Boolean).join(', ');
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, entryValue]) => `${formatLabel(key)}: ${formatValue(entryValue)}`)
      .filter(Boolean)
      .join('; ');
  }
  return String(value);
}

export function formatLabel(value: string): string {
  return value
    .replace(/^diacc\.pctf\./, '')
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, letter => letter.toUpperCase());
}
