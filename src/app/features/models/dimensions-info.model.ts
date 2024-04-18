import { OrgDimensionsInfo } from './org-dimensions-info.model';

export class DimensionsInfo {
  clientId: number=0;
  dimensionId: number=0;
  dimensionName: string='';
  dimensionLength: number=0;
  dimensionWidth: number=0;
  dimensionHeight: number=0;
  dimensionUnits: string='';
  dimensionWeight: number=0;
  weightUnits: string='';
  orgDimensionsInfoList!: OrgDimensionsInfo[];
}
