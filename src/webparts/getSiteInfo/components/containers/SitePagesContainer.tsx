import * as React from "react";

import { MSGraphClientV3 } from "@microsoft/sp-http";

import AsyncContent from "../Shared/AsyncContent";

import SitePagesCard from "../SitePages/SitePagesCard";

import { useSitePages } from "../../hooks/useSitePages";

interface ISitePagesContainerProps {

    graphClient: MSGraphClientV3;

    siteId: string;

}

const SitePagesContainer: React.FC<ISitePagesContainerProps> = (props) => {

    const {

        pages,

        loading,

        error

    } = useSitePages(

        props.graphClient,

        props.siteId

    );

    return (

        <AsyncContent

            loading={loading}

            error={error}

        >

            <SitePagesCard

                pages={pages}

            />

        </AsyncContent>

    );

};

export default SitePagesContainer;