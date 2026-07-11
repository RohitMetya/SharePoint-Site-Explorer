import * as React from "react";

import {
    Stack,
    Text,
    Icon,
    IconButton,
    Separator
} from "@fluentui/react";

import { ISiteUser } from "../../models/ISiteUser";

export interface IPeopleSectionProps {

    title: string;

    iconName: string;

    users: ISiteUser[];

}

const PeopleSection: React.FC<IPeopleSectionProps> = ({

    title,

    iconName,

    users

}) => {

    const [expanded, setExpanded] = React.useState(false);

    return (

        <Stack tokens={{ childrenGap: 10 }}>

            <Stack
                horizontal
                horizontalAlign="space-between"
                verticalAlign="center"
            >

                <Stack
                    horizontal
                    verticalAlign="center"
                    tokens={{ childrenGap: 10 }}
                >

                    <Icon iconName={iconName} />

                    <Text variant="mediumPlus">

                        {title} ({users.length})

                    </Text>

                </Stack>

                <IconButton
                    iconProps={{
                        iconName: expanded ? "ChevronDown" : "ChevronRight"
                    }}
                    onClick={() => setExpanded(!expanded)}
                />

            </Stack>

            {

                expanded && (

                    <Stack
                        tokens={{ childrenGap: 12 }}
                        styles={{
                            root: {
                                paddingLeft: 30
                            }
                        }}
                    >

                        {

                            users.map(user => (

                                <Stack
                                    key={user.id}
                                    tokens={{ childrenGap: 2 }}
                                >

                                    <Text>

                                        {user.title}

                                    </Text>

                                    <Text
                                        variant="small"
                                        styles={{
                                            root: {
                                                color: "#666"
                                            }
                                        }}
                                    >

                                        {user.email || user.loginName}

                                    </Text>

                                </Stack>

                            ))

                        }

                    </Stack>

                )

            }

            <Separator />

        </Stack>

    );

};

export default PeopleSection;