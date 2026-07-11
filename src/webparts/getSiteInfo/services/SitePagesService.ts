import { MSGraphClientV3 } from "@microsoft/sp-http";

import { IGraphSitePageResponse } from "../models/dto/IGraphSitePageResponse";
import { ISharePointPage } from "../models/ISharePointPage";

export class SitePagesService {

    constructor(
        private graphClient: MSGraphClientV3,
        private siteId: string
    ) { }

    public async getPages(): Promise<ISharePointPage[]> {

        const response = await this.graphClient
            .api(`/sites/${this.siteId}/pages/microsoft.graph.sitePage`)
            .get();

        const pages = response.value as IGraphSitePageResponse[];

        return pages.map(page => ({

            id: page.id,

            name: page.name,

            title: page.title,

            webUrl: page.webUrl,

            createdDateTime: page.createdDateTime,

            lastModifiedDateTime: page.lastModifiedDateTime

        }));

    }

}