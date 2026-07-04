import { MSGraphClientV3 } from "@microsoft/sp-http";
import { IUserProfile } from "../models/IUserProfile";
import { IGraphUserResponse } from "../models/dto/IGraphUserResponse";
import { ResponseType } from '@microsoft/microsoft-graph-client';

export class UserService {

    constructor(
        private graphClient: MSGraphClientV3
    ) { }

    public async getCurrentUser(): Promise<IUserProfile> {
        try {
            const response: IGraphUserResponse = await this.graphClient.api(`/me`).select(["displayName", "mail", "jobTitle", "department", "officeLocation", "mobilePhone"]).get();
            return {
                displayName: response.displayName ?? "",
                email: response.mail ?? "",
                jobTitle: response.jobTitle ?? "",
                department: response.department ?? "",
                officeLocation: response.officeLocation ?? "",
                mobilePhone: response.mobilePhone ?? ""
            }
        } catch (error) {

            console.error("Error fetching current user", error);

            throw error;

        }
    }

    public async getCurrentUserPhoto(): Promise<string> {

        try {

            const imageBlob: Blob = await this.graphClient
                .api("/me/photo/$value")
                .responseType(ResponseType.BLOB)
                .get();

            return URL.createObjectURL(imageBlob);

        } catch (error) {

            console.error("Error fetching user photo", error);

            return "";

        }

    }
}

