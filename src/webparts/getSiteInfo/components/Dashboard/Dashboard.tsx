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

const Dashboard: React.FC<IDashboardProps> = (props) => {
    const { selectedSite } = useSite();
    const {
        resolveSite,
        loading,
        error
    } = useSiteResolver(props.graphClient);

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


                    <Stack
                        horizontal
                        wrap
                        tokens={{ childrenGap: 20 }}
                    >

                        <Stack.Item
                            grow
                            className={styles.stackItem}
                        >

                            <SiteContainer

                                graphClient={props.graphClient}

                                siteId={selectedSite.siteId}

                            />

                        </Stack.Item>

                        <Stack.Item
                            grow
                            className={styles.stackItem}
                        >

                            <UserContainer

                                graphClient={props.graphClient}

                                siteId={selectedSite.siteId}

                            />

                        </Stack.Item>
                        <Stack.Item
                            grow
                            className={styles.stackItem}
                        >

                            <SiteListsContainer

                                graphClient={props.graphClient}

                                siteId={selectedSite.siteId}

                            />

                        </Stack.Item>
                        <Stack.Item
                            grow
                            className={styles.stackItem}
                        >
                            <SiteLibrariesContainer
                                graphClient={props.graphClient}
                                siteId={selectedSite.siteId}

                            />
                        </Stack.Item>

                    </Stack>

                )

            }

        </Stack>

    );

};

export default Dashboard;
