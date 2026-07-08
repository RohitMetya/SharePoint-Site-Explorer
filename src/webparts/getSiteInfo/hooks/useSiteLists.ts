import { useEffect, useMemo, useState } from "react";

import { MSGraphClientV3 } from "@microsoft/sp-http";

import { ISharePointList } from "../models/ISharePointList";

import { SiteListService } from "../services/SiteListService";

export const useSiteLists = (
    graphClient: MSGraphClientV3,
    siteId: string
) => {

    const [lists, setLists] = useState<ISharePointList[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const service = useMemo(() => {

        return new SiteListService(graphClient, siteId);

    }, [graphClient, siteId]);

    const loadLists = async (): Promise<void> => {

        try {

            setLoading(true);
            setError("");
            const result = await service.getLists();
            setLists(result);

        }

        catch {

            setError("Unable to load lists.");
            setLists([]);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        void loadLists();

    }, [service]);

    return {

        lists,

        loading,

        error,

        refresh: loadLists

    };

};