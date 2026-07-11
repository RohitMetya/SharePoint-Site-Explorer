import { MSGraphClientV3, SPHttpClient } from "@microsoft/sp-http";

export interface IDashboardProps {

    graphClient: MSGraphClientV3;

    siteId: string;

    spHttpClient: SPHttpClient;

}