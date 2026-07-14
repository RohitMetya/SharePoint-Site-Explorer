import { SPHttpClient } from "@microsoft/sp-http";

export abstract class BaseSharePointService {

    constructor(
        protected spHttpClient: SPHttpClient,
        protected siteUrl: string
    ) { }

    protected async get<T>(endpoint: string): Promise<T> {

        const response = await this.spHttpClient.get(

            `${this.siteUrl}${endpoint}`,

            SPHttpClient.configurations.v1,

            {

                headers: {

                    Accept: "application/json;odata=nometadata"

                }

            }

        );

        if (!response.ok) {

            throw new Error(`Request failed: ${response.status}`);

        }

        return response.json() as Promise<T>;

    }

}