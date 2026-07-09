import * as React from "react";

import { MSGraphClientV3 } from "@microsoft/sp-http";

import SiteLibrariesCard from "../SiteLibraries/SiteLibrariesCard";

import { useSiteLibraries } from "../../hooks/useSiteLibraries";

interface ISiteLibrariesContainerProps {
    graphClient: MSGraphClientV3;
    siteId: string;
}

const SiteLibrariesContainer: React.FC<ISiteLibrariesContainerProps> = (props) => {

    const {
        libraries,
        loading,
        error
    } = useSiteLibraries(props.graphClient, props.siteId);

    if (loading) {

        return <div>Loading Libraries...</div>;

    }

    if (error) {
        return <div>{error}</div>;
    }

    return (

        <SiteLibrariesCard
            libraries={libraries}
        />

    );

};

export default SiteLibrariesContainer;