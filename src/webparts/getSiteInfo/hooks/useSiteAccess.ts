import { useEffect, useMemo, useState } from "react";
import { SPHttpClient } from "@microsoft/sp-http";
import { SiteAccessService } from "../services/SiteAccessService";
import { ISiteAccess } from "../models/ISiteAccess";

export const useSiteAccess = (

    spHttpClient: SPHttpClient,

    siteUrl: string

) => {

    const [access, setAccess] = useState<ISiteAccess | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const service = useMemo(() => {

        return new SiteAccessService(

            spHttpClient,

            siteUrl

        );

    }, [spHttpClient, siteUrl]);

    const loadAccess = async (): Promise<void> => {

        try {

            setLoading(true);

            setError("");

            const result = await service.getAccess();

            setAccess(result);

        }

        catch {

            setError("Unable to load people.");

            setAccess(null);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        void loadAccess();

    }, [service]);

    return {

       access,

        loading,

        error,

        refresh: loadAccess

    };

};