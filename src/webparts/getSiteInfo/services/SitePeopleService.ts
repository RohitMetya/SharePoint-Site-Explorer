import { SPHttpClient } from "@microsoft/sp-http";
import { BaseSharePointService } from "./base/BaseSharePointService";
import { ISitePeople } from "../models/ISitePeople";
import { ISPUserResponse } from "../models/dto/ISPUserResponse";

export class SitePeopleService extends BaseSharePointService {


    private async getUsers(endpoint: string): Promise<ISPUserResponse[]> {

        const response = await this.get<{ value: ISPUserResponse[] }>(
            `/_api/web/${endpoint}/Users`
        );

        return response.value;

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