import * as React from 'react';
import { MSGraphClientV3 } from "@microsoft/sp-http";
import { useState, useMemo, useEffect } from 'react';
import { SiteService } from '../services/SiteService';
import { ICurrentSite } from '../models/ICurrentSite';

interface ICurrentSiteResult {
    currentSite: ICurrentSite;
    loading: boolean;
    error: string;
    refresh: () => Promise<void>;
}

const INITIAL_SITE: ICurrentSite = {
    siteName: "",
    siteUrl: "",
    siteCreatedDate: "",
    siteLastModifiedDate: "",
    siteStorageQuota: 0,
    siteStorageUsed: 0
};

export const useSiteInfo = (graphClient: MSGraphClientV3, siteId: string): ICurrentSiteResult => {

    const [currentSite, setCurrentSite] = useState<ICurrentSite>(INITIAL_SITE);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const siteService = useMemo(() => {
        return new SiteService(graphClient, siteId);
    }, [graphClient, siteId]);

    const fetchSiteInfo = async (): Promise<void> => {
        try {
            setLoading(true);
            setError("");
            const currentSiteInfo = await siteService.getCurrentSiteDetails();
            setCurrentSite(currentSiteInfo)
        } catch (error) {
            console.error("Failed to fetch site information.", error);

            setError("Unable to load site information.");

            setCurrentSite(INITIAL_SITE);
        } finally {
                setLoading(false);
        }
    }

    useEffect(()=>{
        void fetchSiteInfo();
    },[siteService]);

    return {
        currentSite,
        loading,
        error,
        refresh: fetchSiteInfo
    };
}