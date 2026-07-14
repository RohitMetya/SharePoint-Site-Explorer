import * as React from "react";

import AsyncContent from "../Shared/AsyncContent";

import SiteAccessCard from "./SiteAccess/SiteAccessCard";
import { SPHttpClient } from "@microsoft/sp-http";

import { useSiteAccess } from "../../hooks/useSiteAccess";

export interface ISiteAccessContainerProps {

    spHttpClient: SPHttpClient;

    siteUrl: string;

}

const SiteAccessContainer: React.FC<ISiteAccessContainerProps> = (props) => {

    const {

        access,

        loading,

        error,

        refresh

    } = useSiteAccess(

        props.spHttpClient,

        props.siteUrl

    );

    return (

        <AsyncContent

            loading={loading}

            error={error}

        >

            {

                access && (

                    <SiteAccessCard

                        access={access}

                    />

                )

            }

        </AsyncContent>

    );

};

export default SiteAccessContainer;