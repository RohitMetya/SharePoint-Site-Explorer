import { MSGraphClientV3 } from "@microsoft/sp-http";

import { IGraphLibraryResponse } from "../models/dto/IGraphLibraryResponse";

import { ISharePointLibrary } from "../models/ISharePointLibrary";

export class SiteLibrariesService {

    constructor(

        private graphClient: MSGraphClientV3,

        private siteId: string

    ) { }

    public async getLibraries(): Promise<ISharePointLibrary[]> {

        const response = await this.graphClient

            .api(`/sites/${this.siteId}/drives`)

            .get();

        const drives = response.value as IGraphLibraryResponse[];

        return drives.map(drive => ({

            id: drive.id,

            name: drive.name,

            webUrl: drive.webUrl,

            driveType: drive.driveType

        }));

    }

}