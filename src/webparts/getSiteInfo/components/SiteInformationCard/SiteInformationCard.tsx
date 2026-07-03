import * as React from 'react';
import styles from './SiteInformationCard.module.scss'
import { ICurrentSite } from "../../models/ICurrentSite";
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Separator } from '@fluentui/react/lib/Separator';
import { formatDate } from '../../utilities/DateUtils';
import { ProgressIndicator, Link, Icon } from '@fluentui/react';
import { calculateStoragePercentage, formatStorage } from '../../utilities/StorageUtils';


interface ISiteInformationCardProps {

    currentSite: ICurrentSite;

}

const SiteInfoCard: React.FC<ISiteInformationCardProps> = ({ currentSite }) => {

    const storagePercentage = calculateStoragePercentage(currentSite.siteStorageUsed, currentSite.siteStorageQuota);

    return (
        <Stack tokens={{ childrenGap: 8 }} className={styles.card}>

            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>

                <Icon iconName="SharepointLogo" />

                <Text variant="xLarge">

                    {currentSite.siteName}

                </Text>

            </Stack>

            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>

                <Icon iconName="NavigateExternalInline" />

                <Link
                    href={currentSite.siteUrl}
                    target="_blank"
                >
                    Open Site
                </Link>

            </Stack>
            <Separator />
            <Stack horizontal tokens={{ childrenGap: 40 }}>

                    <Stack>

                        <Icon iconName="Calendar" />

                        <Text>
                            Created
                        </Text>
                        <Text>{formatDate(currentSite.siteCreatedDate)}</Text>

                    </Stack> 

                <Stack>

                    <Stack >

                        <Icon iconName="Edit" />

                        <Text>
                            Modified
                        </Text>
                        <Text>{formatDate(currentSite.siteLastModifiedDate)}</Text>

                    </Stack>

                </Stack>
            </Stack>
            <Separator />
            <Stack horizontal tokens={{ childrenGap: 6 }}>

                <Icon iconName="Database" />
                <Text>
                    Storage
                </Text>
                <Text>
                    {formatStorage(currentSite.siteStorageUsed)} {" / "}{formatStorage(currentSite.siteStorageQuota)}
                </Text>

            </Stack>
            <ProgressIndicator
                percentComplete={storagePercentage / 100}
                label="Storage Usage"
            />
            <Text>
                {storagePercentage.toFixed()}%
            </Text>
        </Stack>
    )
}

export default SiteInfoCard;