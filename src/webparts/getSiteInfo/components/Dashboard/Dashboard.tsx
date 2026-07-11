import * as React from "react";
import { Stack, Text } from "@fluentui/react";
import SiteContainer from "../containers/SiteContainer";
import UserContainer from "../containers/UserContainer";
import { IDashboardProps } from "./IDashboardProps";
import styles from './Dashboard.module.scss';
import { useSite } from "../../context/SiteContext";
import SiteSearch from "../SiteSearch";
import { useSiteResolver } from "../../hooks/useSiteResolver";
import { MessageBar, MessageBarType } from "@fluentui/react";
import SiteListsContainer from "../containers/SiteListsContainer";
import SiteLibrariesContainer from "../containers/SiteLibrariesContainer";
import { useState } from "react";
import DashboardNavigation from "../DashboardNavigation";
import SitePagesContainer from "../containers/SitePagesContainer";
import SitePeopleContainer from "../containers/SitePeopleContainer";

const Dashboard: React.FC<IDashboardProps> = (props) => {
    const { selectedSite } = useSite();
    const {
        resolveSite,
        loading,
        error
    } = useSiteResolver(props.graphClient);
    const [selectedTab, setSelectedTab] = useState("overview");

    return (

        <Stack
            tokens={{ childrenGap: 30 }}
            className={styles.dashboard}
        >

            <Stack horizontalAlign="center">

                <Text variant="xxLarge">

                    SharePoint Site Explorer

                </Text>

                <Text
                    variant="large"
                    className={styles.header}
                >

                    Monitor your SharePoint sites.

                </Text>

            </Stack>

            <SiteSearch
                onAnalyze={resolveSite}
                loading={loading}
            />
            {
                error && (

                    <MessageBar

                        messageBarType={MessageBarType.error}

                    >

                        {error}

                    </MessageBar>

                )
            }

            {
                selectedSite && (

                    <DashboardNavigation

                        selectedKey={selectedTab}

                        onChange={setSelectedTab}

                    />

                )
            }


            {
                selectedSite &&
                selectedTab === "overview" && (

                    <SiteContainer

                        graphClient={props.graphClient}

                        spHttpClient={props.spHttpClient}

                        siteId={selectedSite.siteId}
                        

                    />

                )
            }
            {
                selectedSite &&
                selectedTab === "contents" && (

                    <Stack
                        tokens={{ childrenGap: 24 }}
                    >

                        <SiteListsContainer
                            graphClient={props.graphClient}
                            siteId={selectedSite.siteId}
                        />

                        <SiteLibrariesContainer
                            graphClient={props.graphClient}
                            siteId={selectedSite.siteId}
                        />

                        <SitePagesContainer
                            graphClient={props.graphClient}
                            siteId={selectedSite.siteId}
                        />

                    </Stack>

                )
            }
            {
                selectedSite &&
                selectedTab === "people" && (

                    <SitePeopleContainer

                        spHttpClient={props.spHttpClient}

                        siteUrl={selectedSite.siteUrl}

                    />

                )
            }
        </Stack>

    );

};

export default Dashboard;
