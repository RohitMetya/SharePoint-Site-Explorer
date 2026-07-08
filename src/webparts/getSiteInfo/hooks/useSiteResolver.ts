import { useMemo, useState } from "react";
import { MSGraphClientV3 } from "@microsoft/sp-http";

import { SiteResolverService } from "../services/SiteResolverService";
import { useSite } from "../context/SiteContext";

export const useSiteResolver = (
    graphClient: MSGraphClientV3
) => {

    const { selectSite, clearSite } = useSite();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const service = useMemo(() => {
        return new SiteResolverService(graphClient);
    }, [graphClient]);

    const resolveSite = async (url: string): Promise<void> => {

        try {

            setLoading(true);

            setError("");

            const site =
                await service.resolveSite(url);

            selectSite(site);

        } catch {

            clearSite();
            setError(
                "Unable to resolve SharePoint site."
            );
            

        } finally {

            setLoading(false);

        }

    };

    return {

        resolveSite,

        loading,

        error

    };

};