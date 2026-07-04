import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IGetSiteInfoProps {
  graphClient: MSGraphClientV3;
  siteId: string;
}
