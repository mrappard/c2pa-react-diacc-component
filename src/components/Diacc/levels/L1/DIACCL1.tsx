import { DIACC_Header } from "../../DIACC_Header";
import { Manifest } from 'c2pa-react-component-types';
import { getClaimGenerator, getDiaccPctfAssertion, getDisplayTitle, getInitials } from "../../diaccAssertion";
import "../styles/diacc.css";

export interface DIACCL1Props {
  manifest: Manifest;
  moreInfo?: () => void;
}

export function DIACCL1({ manifest, moreInfo }: DIACCL1Props) {
  const assertion = getDiaccPctfAssertion(manifest);
  const title = getDisplayTitle(manifest, assertion);
  const claimGenerator = getClaimGenerator(manifest);
  const initials = getInitials(claimGenerator);

  return (
    <div className="diacc-card">
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

      {!assertion && (
        <div className="diacc-empty">No DIACC PCTF conformance assertion found.</div>
      )}

      {moreInfo && (
        <div className="diacc-action">
          <button onClick={moreInfo} className="diacc-button">More Info</button>
        </div>
      )}
    </div>
  );
}
