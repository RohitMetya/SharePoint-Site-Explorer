import { MSGraphClientV3, SPHttpClient } from '@microsoft/sp-http';

export interface IGetSiteInfoProps {
  graphClient: MSGraphClientV3;
  siteId: string;
  spHttpClient: SPHttpClient;
}
