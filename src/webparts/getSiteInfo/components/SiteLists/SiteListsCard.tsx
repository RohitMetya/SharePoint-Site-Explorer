import * as React from "react";

import {
    Stack,
    Text,
    Link,
    Icon
} from "@fluentui/react";

import { ISharePointList } from "../../models/ISharePointList";

export interface ISiteListsCardProps {

    lists: ISharePointList[];

}

const SiteListsCard: React.FC<ISiteListsCardProps> = ({ lists }) => {

    return (

        <Stack
            tokens={{ childrenGap: 12 }}
        >

            <Text variant="xLarge">

                Lists

            </Text>

            {

                lists.map(list => (

                    <Stack
                        horizontal
                        verticalAlign="center"
                        tokens={{ childrenGap: 10 }}
                        key={list.id}
                    >

                        <Icon iconName="BulletedList" />

                        <Link
                            href={list.webUrl}
                            target="_blank"
                        >

                            {list.displayName}

                        </Link>

                    </Stack>

                ))

            }

        </Stack>

    );

};

export default SiteListsCard;