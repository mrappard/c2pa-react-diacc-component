import { DIACC_Header } from "../../DIACC_Header";
import { Manifest } from 'c2pa-react-component-types';
import {
  formatLabel,
  formatValue,
  getClaimGenerator,
  getDiaccPctfAssertion,
  getDisplayTitle,
  getInitials,
} from "../../diaccAssertion";
import "../styles/diacc.css";

export interface DIACCL3Props {
  manifest: Manifest;
  moreInfo?: () => void;
  className?: string;
}

function renderConformanceEntry(entry: unknown, index: number) {
  if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
    return (
      <div key={index} className="diacc-conformance-item">
        {Object.entries(entry as Record<string, unknown>).map(([key, value]) => {
          const formatted = formatValue(value);
          if (!formatted) return null;
          return (
            <div key={key} className="diacc-key-value">
              <div className="diacc-key-value-label">{formatLabel(key)}</div>
              <div className="diacc-key-value-value">{formatted}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div key={index} className="diacc-conformance-item">
      {formatValue(entry)}
    </div>
  );
}

export default function DIACCL3({ manifest, moreInfo, className }: DIACCL3Props) {
  const assertion = getDiaccPctfAssertion(manifest);
  const title = getDisplayTitle(manifest, assertion);
  const claimGenerator = getClaimGenerator(manifest);
  const initials = getInitials(claimGenerator);
  const conformance = assertion?.conformance ?? [];

  return (
    <div className={`diacc-card ${className}`}>
      <DIACC_Header />
      <div className="diacc-container">
        {manifest.thumbnail ? (
          <img src={manifest.thumbnail} alt="Thumbnail" className="diacc-thumbnail" />
        ) : (
          <div className="diacc-square">
            <span className="diacc-logo-text">{initials}</span>
          </div>
        )}
        <div className="diacc-summary">
          <span className="diacc-media-title">{title}</span>
          <span className="diacc-claim-generator">{claimGenerator}</span>
        </div>
      </div>

      {!assertion ? (
        <div className="diacc-empty">No DIACC PCTF conformance assertion found.</div>
      ) : (
        <>
          <div className="diacc-divider" />
          <div className="diacc-section-title">Assertion</div>
          <div className="diacc-key-value">
            <div className="diacc-key-value-label">Label</div>
            <div className="diacc-key-value-value">diacc.pctf.conformance</div>
          </div>
          <div className="diacc-key-value">
            <div className="diacc-key-value-label">Name</div>
            <div className="diacc-key-value-value">{title}</div>
          </div>
          {assertion.description && (
            <div className="diacc-key-value">
              <div className="diacc-key-value-label">Description</div>
              <div className="diacc-key-value-value">{assertion.description}</div>
            </div>
          )}

          {conformance.length > 0 && (
            <>
              <div className="diacc-divider" />
              <div className="diacc-section-title">Conformance</div>
              <div className="diacc-conformance-list">
                {conformance.map(renderConformanceEntry)}
              </div>
            </>
          )}
        </>
      )}

      {moreInfo && (
        <div className="diacc-action">
          <button onClick={moreInfo} className="diacc-button">Small View</button>
        </div>
      )}
    </div>
  );
}
