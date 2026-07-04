import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { IUserProfile } from '../models/IUserProfile';
import { UserService } from '../services/UserService';
import { IGetSiteInfoProps } from './IGetSiteInfoProps';
import UserProfileCard from './UserProfileCard/UserProfileCard';


const UserContainer: React.FC<IGetSiteInfoProps> = (props) => {

    const [currentUser, setCurrentUser] = useState<IUserProfile>({
        displayName: "",
        email: "",
        jobTitle: "",
        department: "",
        officeLocation: "",
        mobilePhone: "",
        photoUrl: "",

    });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const userService = useMemo(() => {
        return new UserService(props.graphClient);
    }, [props.graphClient]);

    const fetchCurrentUser = async (): Promise<void> => {

        try {
            setLoading(true);
            setError("");
            const [userInfo, photoUrl] = await Promise.all([userService.getCurrentUser(), userService.getCurrentUserPhoto()]);
            setCurrentUser({
                ...userInfo,
                photoUrl: photoUrl
            });
        } catch (error) {
            console.error("Failed to fetch current user information.", error);
            setError("Unable to load user info");
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        void fetchCurrentUser();
    }, [userService]);

    return (
        <UserProfileCard user={currentUser} />
    )
}

export default UserContainer;

