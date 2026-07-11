import { useEffect, useMemo, useState } from "react";

import { MSGraphClientV3 } from "@microsoft/sp-http";

import { SitePagesService } from "../services/SitePagesService";

import { ISharePointPage } from "../models/ISharePointPage";

export const useSitePages = (

    graphClient: MSGraphClientV3,

    siteId: string

) => {

    const [pages, setPages] = useState<ISharePointPage[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const service = useMemo(() => {

        return new SitePagesService(

            graphClient,

            siteId

        );

    }, [graphClient, siteId]);

    const loadPages = async (): Promise<void> => {

        try {

            setLoading(true);

            setError("");

            const data = await service.getPages();

            setPages(data);

        }

        catch {

            setPages([]);

            setError("Unable to load site pages.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        void loadPages();

    }, [service]);

    return {

        pages,

        loading,

        error,

        refresh: loadPages

    };

};