import * as React from "react";

import { MSGraphClientV3 } from "@microsoft/sp-http";

import SiteLibrariesCard from "../SiteLibraries/SiteLibrariesCard";

import { useSiteLibraries } from "../../hooks/useSiteLibraries";

interface ISiteLibrariesContainerProps {
    graphClient: MSGraphClientV3;
    siteId: string;
}
import AsyncContent from "../Shared/AsyncContent";

const SiteLibrariesContainer: React.FC<ISiteLibrariesContainerProps> = (props) => {

    const {
        libraries,
        loading,
        error
    } = useSiteLibraries(props.graphClient, props.siteId);

    return (

        <AsyncContent
            loading={loading}
            error={error}

        >
            <SiteLibrariesCard
                libraries={libraries}
            />
        </AsyncContent>

    );

};

export default SiteLibrariesContainer;