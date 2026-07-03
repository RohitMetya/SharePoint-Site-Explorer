import { MSGraphClientV3 } from '@microsoft/sp-http';
import { IGraphSiteResponse } from '../models/dto/IGraphSiteResponse';
import { ICurrentSite } from '../models/ICurrentSite';
import { ISiteInfo } from '../models/ISiteInfo';
import { IDriveInfo } from '../models/IDriveInfo';
import { IGraphDriveResponse } from '../models/dto/IGraphDriveResponse';

export class GraphService {
  constructor(private graphClient: MSGraphClientV3, private siteId: string) { }

  public async getSiteInfo(): Promise<ISiteInfo> {
    try {
      const response: IGraphSiteResponse = await this.graphClient.api(`/sites/${this.siteId}`).select("displayName,webUrl,createdDateTime,lastModifiedDateTime").get();
      return {
        siteName: response.displayName,
        siteUrl: response.webUrl,
        siteCreatedDate: response.createdDateTime,
        siteLastModifiedDate: response.lastModifiedDateTime
      }
    } catch (error) {
      console.error("Error fetching site info", error);
      throw error;

    }
  }

  public async getDriveInfo(): Promise<IDriveInfo> {
    try {
      const response: IGraphDriveResponse = await this.graphClient.api(`/sites/${this.siteId}/drive`).select("quota").get();
      return {
        siteStorageQuota: response.quota.total,
        siteStorageUsed: response.quota.used
      }
    } catch (error) {
      console.error("Error fetching drive info", error);
      throw error;
    }
  }

  public async getCurrentSiteDetails(): Promise<ICurrentSite> {
    try {
      const [siteInfo, driveInfo] = await Promise.all([this.getSiteInfo(), this.getDriveInfo()]);
      return {
        siteName: siteInfo.siteName,
        siteUrl: siteInfo.siteUrl,
        siteCreatedDate: siteInfo.siteCreatedDate,
        siteLastModifiedDate: siteInfo.siteLastModifiedDate,
        siteStorageQuota: driveInfo.siteStorageQuota,
        siteStorageUsed: driveInfo.siteStorageUsed
      }
    } catch (error) {
      console.error("Error fetching current site details", error);
      throw error;
    }
  }
}