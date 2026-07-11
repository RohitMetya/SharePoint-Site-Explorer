import * as React from 'react';
import styles from '../GetSiteInfo.module.scss';
import type { IGetSiteInfoProps } from '../IGetSiteInfoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import SiteInfoCard from '../SiteInformationCard/SiteInformationCard';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack
} from "@fluentui/react";
import AsyncContent from '../Shared/AsyncContent';

const SiteContainer: React.FC<IGetSiteInfoProps> = (props) => {

  const { currentSite, loading, error, refresh } = useSiteInfo(props.graphClient, props.siteId)


  return (

    <AsyncContent
      loading={loading}
      error={error}
    >

      <SiteInfoCard currentSite={currentSite} />

    </AsyncContent>

  );
}

export default SiteContainer;
