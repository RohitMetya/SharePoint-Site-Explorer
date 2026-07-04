import * as React from 'react';
import { Persona, PersonaSize, Stack, Icon, Text } from '@fluentui/react';
import { IUserProfile } from '../../models/IUserProfile';
import styles from './UserProfileCard.module.scss';

interface IUserProfileInformationCardProps {

    user: IUserProfile;
}

const UserProfileCard: React.FC<IUserProfileInformationCardProps> = ({ user }) => {
    return (
        <Stack className={styles.card}>
            <Persona

                text={user.displayName}

                secondaryText={user.jobTitle}

                imageUrl={user.photoUrl}

                size={PersonaSize.size56}

            />
            <Stack tokens={{ childrenGap: 10 }} className={styles.details}>

                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <Icon iconName="Mail" />

                    <Text>

                        {user.email}

                    </Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <Icon iconName="AccountManagement" />

                    <Text>

                        {user.department}

                    </Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <Icon iconName="Location" />

                    <Text>

                        {user.officeLocation}

                    </Text>
                </Stack>
                {user.mobilePhone ? (
                    <>
                        <Stack horizontal tokens={{ childrenGap: 10 }}>
                            <Icon iconName="Phone" />
                            <Text>
                                {user.mobilePhone}
                            </Text>
                        </Stack>
                    </>
                ) : null}

            </Stack>
        </Stack>
    );
}

export default UserProfileCard;