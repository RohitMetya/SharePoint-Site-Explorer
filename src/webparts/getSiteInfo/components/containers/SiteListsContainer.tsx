import * as React from "react";

import { MSGraphClientV3 } from "@microsoft/sp-http";

import SiteListsCard from "../SiteLists/SiteListsCard";

import { useSiteLists } from "../../hooks/useSiteLists";
import AsyncContent from "../Shared/AsyncContent";

export interface ISiteListsContainerProps {

    graphClient: MSGraphClientV3;

    siteId: string;

}

const SiteListsContainer: React.FC<ISiteListsContainerProps> = (props) => {

    const {
        lists,
        loading,
        error,
        refresh
    } = useSiteLists(props.graphClient, props.siteId);

    return (

        <AsyncContent

            loading={loading}

            error={error}

        >

            <SiteListsCard

                lists={lists}

            />

        </AsyncContent>

    );

};

export default SiteListsContainer;