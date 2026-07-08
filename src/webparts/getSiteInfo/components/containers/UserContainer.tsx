import * as React from 'react';
import { IGetSiteInfoProps } from '../IGetSiteInfoProps';
import UserProfileCard from '../UserProfileCard/UserProfileCard';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import {
    Spinner,
    SpinnerSize,
    MessageBar,
    MessageBarType,
    PrimaryButton,
    Stack
} from "@fluentui/react";


const UserContainer: React.FC<IGetSiteInfoProps> = (props) => {

    const { currentUser, loading, error, refresh } = useCurrentUser(props.graphClient);


    if (loading) {

        return (
            <Spinner
                label="Loading user information..."
                size={SpinnerSize.large}
            />
        );

    }

    if (error) {

        return (

            <Stack tokens={{ childrenGap: 12 }}>

                <MessageBar
                    messageBarType={MessageBarType.error}
                >
                    {error}
                </MessageBar>

                <PrimaryButton
                    text="Retry"
                    onClick={() => void refresh()}
                />

            </Stack>

        );

    }
    return (
        <UserProfileCard user={currentUser} />
    )
}

export default UserContainer;

