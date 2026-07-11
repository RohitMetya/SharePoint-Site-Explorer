import * as React from "react";
import { SPHttpClient } from "@microsoft/sp-http";
import AsyncContent from "../Shared/AsyncContent";
import SitePeopleCard from "../SitePeople/SitePeopleCard";
import { useSitePeople } from "../../hooks/useSitePeople";
export interface ISitePeopleContainerProps {

    spHttpClient: SPHttpClient;
    siteUrl: string;

}

const SitePeopleContainer: React.FC<ISitePeopleContainerProps> = (props) => {

    const {

        people,

        loading,

        error,

        refresh

    } = useSitePeople(

        props.spHttpClient,

        props.siteUrl

    );

    return (

        <AsyncContent

            loading={loading}

            error={error}

        >

            {

                people && (

                    <SitePeopleCard

                        people={people}

                    />

                )

            }

        </AsyncContent>

    );

};

export default SitePeopleContainer;