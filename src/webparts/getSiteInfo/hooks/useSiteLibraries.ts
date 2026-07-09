import { useEffect, useMemo, useState } from "react";

import { MSGraphClientV3 } from "@microsoft/sp-http";

import { SiteLibrariesService } from "../services/SiteLibrariesService";

import { ISharePointLibrary } from "../models/ISharePointLibrary";

export const useSiteLibraries = (
    graphClient: MSGraphClientV3,
    siteId: string
) => {

    const [libraries, setLibraries] = useState<ISharePointLibrary[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const service = useMemo(() => {

        return new SiteLibrariesService(
            graphClient,
            siteId
        );

    }, [graphClient, siteId]);

    const loadLibraries = async (): Promise<void> => {

        try {

            setLoading(true);
            setError("");
            const data = await service.getLibraries();
            setLibraries(data);

        }

        catch {
            setLibraries([]);
            setError(
                "Unable to load document libraries."
            );

        }
        finally {
            setLoading(false);

        }

    };

    useEffect(() => {

        void loadLibraries();

    }, [service]);

    return {

        libraries,

        loading,

        error,

        refresh: loadLibraries

    };

};