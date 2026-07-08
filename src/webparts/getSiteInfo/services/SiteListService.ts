import { MSGraphClientV3 } from "@microsoft/sp-http";
import { ISharePointList } from "../models/ISharePointList";
import { IGraphListResponse } from "../models/dto/IGraphListResponse";

export class SiteListService {

    constructor(
        private graphClient: MSGraphClientV3,
        private siteId: string
    ) { }

    public async getLists(): Promise<ISharePointList[]> {

        const response = await this.graphClient
            .api(`/sites/${this.siteId}/lists`)
            .select("id,displayName,description,webUrl,system")
            .get();
        const graphLists = response.value as IGraphListResponse[];
        return graphLists.map((list) => ({

            id: list.id,

            displayName: list.displayName,

            description: list.description ?? "",

            webUrl: list.webUrl,

            hidden: list.system ?? false

        }));

    }

}