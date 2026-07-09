import * as React from "react";

import {

    Stack,
    Text,
    Link,
    Icon

} from "@fluentui/react";

import { ISiteLibrariesCardProps } from "./ISiteLibrariesCardProps";

const SiteLibrariesCard: React.FC<ISiteLibrariesCardProps> = ({
    libraries
}) => {

    return (

        <Stack tokens={{ childrenGap: 10 }}>

            <Text variant="xLarge">

                Document Libraries

            </Text>

            {

                libraries.map(library => (

                    <Stack

                        key={library.id}
                        horizontal
                        verticalAlign="center"
                        tokens={{ childrenGap: 10 }}

                    >

                        <Icon iconName="FabricFolder" />

                        <Link
                            href={library.webUrl}
                            target="_blank"
                        >

                            {library.name}

                        </Link>

                    </Stack>

                ))

            }

        </Stack>

    );

};

export default SiteLibrariesCard;