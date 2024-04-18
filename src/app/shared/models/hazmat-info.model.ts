import { HazmatCommodityInfo } from './hazmat-commodity-info.model';

export class HazmatInfo {
  hazmatFlag: boolean = false;
  signatureName: string = '';
  hazmatCommodityInfoList: HazmatCommodityInfo[] = [];
  allPackedInOneFlag: boolean = false;
  overPackedFlag: boolean = false;
  qvalue: string = '';
  outerPackagingType: string = '';
  regulationSet: string = '';
}
