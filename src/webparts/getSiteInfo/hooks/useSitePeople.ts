import { useEffect, useMemo, useState } from "react";

import { SPHttpClient } from "@microsoft/sp-http";

import { ISitePeople } from "../models/ISitePeople";

import { SitePeopleService } from "../services/SitePeopleService";

export const useSitePeople = (

    spHttpClient: SPHttpClient,

    siteUrl: string

) => {

    const [people, setPeople] = useState<ISitePeople | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const service = useMemo(() => {

        return new SitePeopleService(

            spHttpClient,

            siteUrl

        );

    }, [spHttpClient, siteUrl]);

    const loadPeople = async (): Promise<void> => {

        try {

            setLoading(true);

            setError("");

            const result = await service.getPeople();

            setPeople(result);

        }

        catch {

            setError("Unable to load people.");

            setPeople(null);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        void loadPeople();

    }, [service]);

    return {

        people,

        loading,

        error,

        refresh: loadPeople

    };

};