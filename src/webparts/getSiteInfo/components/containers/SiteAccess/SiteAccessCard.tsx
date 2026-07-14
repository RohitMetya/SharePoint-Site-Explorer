import * as React from "react";

import {
    Stack,
    Text,
    Separator,
    Icon
} from "@fluentui/react";

import { ISiteAccessCardProps } from "./ISiteAccessCardProps";

const SiteAccessCard: React.FC<ISiteAccessCardProps> = ({ access }) => {

    return (

        <Stack tokens={{ childrenGap: 20 }}>

            <Text variant="xLarge">

                Access

            </Text>

            {/* Permission Model */}

            <Stack
                horizontal
                verticalAlign="center"
                tokens={{ childrenGap: 10 }}
            >

                <Icon
                    iconName={
                        access.hasUniquePermissions
                            ? "Warning"
                            : "Completed"
                    }
                />

                <Text variant="mediumPlus">

                    Permission Model

                </Text>

            </Stack>

            <Text>

                {
                    access.hasUniquePermissions
                        ? "Unique Permissions"
                        : "Inherited Permissions"
                }

            </Text>

            <Separator />

            {/* Owner Group */}

            <Stack tokens={{ childrenGap: 6 }}>

                <Text variant="mediumPlus">

                    Owners Group

                </Text>

                <Text>

                    {access.ownerGroupName}

                </Text>

            </Stack>

            <Separator />

            {/* Member Group */}

            <Stack tokens={{ childrenGap: 6 }}>

                <Text variant="mediumPlus">

                    Members Group

                </Text>

                <Text>

                    {access.memberGroupName}

                </Text>

            </Stack>

            <Separator />

            {/* Visitor Group */}

            <Stack tokens={{ childrenGap: 6 }}>

                <Text variant="mediumPlus">

                    Visitors Group

                </Text>

                <Text>

                    {access.visitorGroupName}

                </Text>

            </Stack>

        </Stack>

    );

};

export default SiteAccessCard;