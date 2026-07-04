import * as React from "react";
import { Stack, Text } from "@fluentui/react";
import SiteContainer from "../SiteContainer";
import UserContainer from "../UserContainer";
import { IDashboardProps } from "./IDashboardProps";
import styles from './Dashboard.module.scss';

const Dashboard: React.FC<IDashboardProps> = (props) => {

    return (

        <>
            <Stack tokens={{ childrenGap: 40 }} className={styles.dashboard}>
                <Stack horizontalAlign="center">
                    <Text variant="xxLarge">
                        SharePoint Site Explorer
                    </Text>
                    <Text variant="large" className={styles.header}>
                        Monitor your SharePoint site and user information.
                    </Text>
                </Stack>
                <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
                    <Stack.Item grow className={styles.stackItem}>
                        <SiteContainer

                            graphClient={props.graphClient}

                            siteId={props.siteId}

                        />
                    </Stack.Item>
                    <Stack.Item grow className={styles.stackItem}>


                        <UserContainer

                            graphClient={props.graphClient}

                            siteId={props.siteId}

                        />
                    </Stack.Item>

                </Stack>
            </Stack>
        </>

    );

};

export default Dashboard;
