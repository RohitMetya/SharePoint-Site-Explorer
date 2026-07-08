import * as React from "react";

import { MSGraphClientV3 } from "@microsoft/sp-http";

import SiteListsCard from "../SiteLists/SiteListsCard";

import { useSiteLists } from "../../hooks/useSiteLists";

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

    if (loading) {

        return <div>Loading Lists...</div>;

    }

    if (error) {

        return <div>{error}</div>;

    }

    return (

        <SiteListsCard

            lists={lists}

        />

    );

};

export default SiteListsContainer;