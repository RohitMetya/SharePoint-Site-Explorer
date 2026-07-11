import * as React from "react";

import {

    Stack,
    Text,
    Link,
    Icon

} from "@fluentui/react";

import { ISitePagesCardProps } from "./ISitePagesCardProps";

const SitePagesCard: React.FC<ISitePagesCardProps> = ({

    pages

}) => {

    return (

        <Stack tokens={{ childrenGap: 10 }}>

            <Text variant="xLarge">

                Site Pages

            </Text>

            {

                pages.map(page => (

                    <Stack

                        key={page.id}

                        horizontal

                        verticalAlign="center"

                        tokens={{ childrenGap: 10 }}

                    >

                        <Icon iconName="Page" />

                        <Link

                            href={page.webUrl}

                            target="_blank"

                        >

                            {page.title || page.name}

                        </Link>

                    </Stack>

                ))

            }

        </Stack>

    );

};

export default SitePagesCard;