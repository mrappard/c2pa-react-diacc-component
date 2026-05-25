import React from 'react'

import { DIACCL1 } from './levels/L1/DIACCL1'
import DIACCL2 from './levels/L2/DIACCL2';
import DIACCL3 from './levels/L3/DIACCL3';
import { Manifest, PluginC2PA } from 'c2pa-react-component-types';

export const DIACCManifest: PluginC2PA = ({ manifest, level, className }) => {
  const [levelOfDetail, setLevelOfDetail] = React.useState(level || 1)
  const activeManifestKey = manifest.manifestStore?.activeManifest;
  const activeManifest =
    manifest.manifests.find(
      m => m.id === activeManifestKey || m.instanceId === activeManifestKey
    ) ??
    (activeManifestKey
      ? manifest.manifestStore!.manifests[activeManifestKey] as unknown as Manifest
      : undefined) ??
    manifest.manifests[0];

  if (!activeManifest) {
    return <div className={className}>No active manifest found.</div>
  }

  switch (levelOfDetail) {
    case 1: return <DIACCL1 manifest={activeManifest} moreInfo={() => {
      setLevelOfDetail(2);
    }} />
    case 2: return <DIACCL2 manifest={activeManifest} moreInfo={() => {
      setLevelOfDetail(3);
    }} />
    case 3: return <DIACCL3 manifest={activeManifest} moreInfo={() => {
      setLevelOfDetail(1);
    }} />
  }

  return <div>Level Of Detail Not Selected</div>
}

export default DIACCManifest
