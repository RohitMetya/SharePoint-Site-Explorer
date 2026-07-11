import { SPHttpClient } from "@microsoft/sp-http";

import { ISitePeople } from "../models/ISitePeople";
import { ISPUserResponse } from "../models/dto/ISPUserResponse";

export class SitePeopleService {

    constructor(

        private spHttpClient: SPHttpClient,

        private siteUrl: string

    ) { }

    private async getUsers(endpoint: string): Promise<ISPUserResponse[]> {

        const response = await this.spHttpClient.get(

            `${this.siteUrl}/_api/web/${endpoint}/Users`,

            SPHttpClient.configurations.v1,

            {

                headers: {

                    Accept: "application/json;odata=nometadata"

                }

            }

        );

        const data = await response.json();

        return data.value;

    }

    public async getPeople(): Promise<ISitePeople> {

        const [owners, members, visitors] = await Promise.all([

            this.getUsers("AssociatedOwnerGroup"),

            this.getUsers("AssociatedMemberGroup"),

            this.getUsers("AssociatedVisitorGroup")

        ]);

        return {

            owners: owners.map(this.mapUser),

            members: members.map(this.mapUser),

            visitors: visitors.map(this.mapUser)

        };

    }

    private mapUser(user: ISPUserResponse) {

        return {

            id: user.Id,

            title: user.Title,

            email: user.Email,

            loginName: user.LoginName

        };

    }

}