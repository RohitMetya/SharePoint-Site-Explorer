import * as React from "react";

import {
    Stack,
    Text
} from "@fluentui/react";

import { ISitePeopleCardProps } from "./ISitePeopleCardProps";

import PeopleSection from "./PeopleSection";

const SitePeopleCard: React.FC<ISitePeopleCardProps> = ({

    people

}) => {

    return (

        <Stack
            tokens={{ childrenGap: 20 }}
        >

            <Text variant="xLarge">

                People

            </Text>

            <PeopleSection

                title="Owners"

                iconName="Contact"

                users={people.owners}

            />

            <PeopleSection

                title="Members"

                iconName="People"

                users={people.members}

            />

            <PeopleSection

                title="Visitors"

                iconName="View"

                users={people.visitors}

            />

        </Stack>

    );

};

export default SitePeopleCard;