import { SPHttpClient } from "@microsoft/sp-http";

import { BaseSharePointService } from "./base/BaseSharePointService";

import { ISiteAccess } from "../models/ISiteAccess";

import { IWebSecurityResponse } from "../models/dto/IWebSecurityResponse";

import { ISPGroupResponse } from "../models/dto/ISPGroupResponse";

export class SiteAccessService extends BaseSharePointService {

    constructor(

        spHttpClient: SPHttpClient,

        siteUrl: string

    ) {

        super(spHttpClient, siteUrl);

    }

    public async getAccess(): Promise<ISiteAccess> {

        const [web, ownerGroup, memberGroup, visitorGroup] = await Promise.all([

            this.get<IWebSecurityResponse>(

                "/_api/web?$select=HasUniqueRoleAssignments"

            ),

            this.get<ISPGroupResponse>(

                "/_api/web/AssociatedOwnerGroup"

            ),

            this.get<ISPGroupResponse>(

                "/_api/web/AssociatedMemberGroup"

            ),

            this.get<ISPGroupResponse>(

                "/_api/web/AssociatedVisitorGroup"

            )

        ]);

        return {

            hasUniquePermissions: web.HasUniqueRoleAssignments,

            ownerGroupName: ownerGroup.Title,

            memberGroupName: memberGroup.Title,

            visitorGroupName: visitorGroup.Title

        };

    }

}