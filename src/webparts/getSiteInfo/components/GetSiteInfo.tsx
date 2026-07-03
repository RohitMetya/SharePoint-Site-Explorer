import * as React from 'react';
import styles from './GetSiteInfo.module.scss';
import type { IGetSiteInfoProps } from './IGetSiteInfoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState, useMemo, useEffect } from 'react';
import { GraphService } from '../services/GraphService';
import { ICurrentSite } from '../models/ICurrentSite';
import SiteInfoCard from './SiteInformationCard/SiteInformationCard';

const GetSiteInfo: React.FC<IGetSiteInfoProps> = (props) => {

  const [currentSite, setCurrentSite] = useState<ICurrentSite>({
    siteName: "",

    siteUrl: "",

    siteCreatedDate: "",

    siteLastModifiedDate: "",

    siteStorageQuota: 0,

    siteStorageUsed: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const graphService = useMemo(() => {
    return new GraphService(props.graphClient, props.siteId);
  }, [props.graphClient, props.siteId]);

  const fetchSiteInfo = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const currentSiteInfo = await graphService.getCurrentSiteDetails();
      setCurrentSite(currentSiteInfo);

    } catch (error) {
      console.error("Failed to fetch current site information.",error);
      setError("Unable to load site info");
      setCurrentSite({
        siteName: "",
        siteUrl: "",
        siteCreatedDate: "",
        siteLastModifiedDate: "",
        siteStorageQuota: 0,
        siteStorageUsed: 0
      });

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    void fetchSiteInfo();

  }, [graphService]);

  return (
    <SiteInfoCard currentSite={currentSite} />
  )
};

export default GetSiteInfo;
