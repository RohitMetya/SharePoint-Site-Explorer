import { MSGraphClientV3 } from "@microsoft/sp-http";

export interface IDashboardProps {

    graphClient: MSGraphClientV3;

    siteId: string;

}