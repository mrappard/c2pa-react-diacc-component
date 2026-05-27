import { DIACC_Header } from "../../DIACC_Header";
import { Manifest } from 'c2pa-react-component-types';
import {
  formatValue,
  getClaimGenerator,
  getDiaccPctfAssertion,
  getDisplayTitle,
  getInitials,
} from "../../diaccAssertion";
import "../styles/diacc.css";

export interface DIACCL2Props {
  manifest: Manifest;
  moreInfo?: () => void;
  className?: string;
}

export default function DIACCL2({ className, manifest, moreInfo }: DIACCL2Props) {
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
          {assertion.description && (
            <>
              <div className="diacc-divider" />
              <div className="diacc-section-title">Description</div>
              <div className="diacc-description">{assertion.description}</div>
            </>
          )}

          {conformance.length > 0 && (
            <>
              <div className="diacc-divider" />
              <div className="diacc-section-title">Conformance</div>
              <div className="diacc-conformance-list">
                {conformance.map((entry, index) => (
                  <div key={index} className="diacc-conformance-item">
                    {formatValue(entry)}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {moreInfo && (
        <div className="diacc-action">
          <button onClick={moreInfo} className="diacc-button">More Info</button>
        </div>
      )}
    </div>
  );
}
