import { MSGraphClientV3 } from "@microsoft/sp-http";
import { IGraphResolvedSiteResponse } from "../models/dto/IGraphResolvedSiteResponse";
import { ISelectedSite } from "../models/ISelectedSite";

export class SiteResolverService {

    constructor(
        private graphClient: MSGraphClientV3
    ) { }

    public async resolveSite(
        siteUrl: string
    ): Promise<ISelectedSite> {

        try {

            const url = new URL(siteUrl);

            const host = url.hostname;

            const path = url.pathname;

            const response: IGraphResolvedSiteResponse =
                await this.graphClient
                    .api(`/sites/${host}:${path}`)
                    .get();

            return {

                siteId: response.id,

                siteName: response.displayName,

                siteUrl: response.webUrl

            };

        } catch (error) {

            console.error(
                "Error resolving SharePoint site.",
                error
            );

            throw error;

        }

    }

}