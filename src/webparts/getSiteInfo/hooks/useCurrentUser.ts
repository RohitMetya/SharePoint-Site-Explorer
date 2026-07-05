import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { IUserProfile } from '../models/IUserProfile';
import { UserService } from '../services/UserService';
import { MSGraphClientV3 } from "@microsoft/sp-http";

interface IUseCurrentUserResult {
    currentUser: IUserProfile;
    loading: boolean;
    error: string;
    refresh: () => Promise<void>;
}

const INITIAL_USER: IUserProfile = {
    displayName: "",
    email: "",
    jobTitle: "",
    department: "",
    officeLocation: "",
    mobilePhone: "",
    photoUrl: ""
};

export const useCurrentUser = (graphClient: MSGraphClientV3): IUseCurrentUserResult => {

    const [currentUser, setCurrentUser] = useState<IUserProfile>(INITIAL_USER);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const userService = useMemo(() => {
        return new UserService(graphClient);
    }, [graphClient]);

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
            setCurrentUser(INITIAL_USER);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        void fetchCurrentUser();
    }, [userService]);

    return {currentUser, loading, error, refresh: fetchCurrentUser};
}