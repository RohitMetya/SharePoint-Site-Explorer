import * as React from 'react';
import styles from './GetSiteInfo.module.scss';
import type { IGetSiteInfoProps } from './IGetSiteInfoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import SiteInfoCard from './SiteInformationCard/SiteInformationCard';
import { useSiteInfo } from '../hooks/useSiteInfo';
import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack
} from "@fluentui/react";

const SiteContainer: React.FC<IGetSiteInfoProps> = (props) => {

  const { currentSite, loading, error, refresh } = useSiteInfo(props.graphClient, props.siteId)

  if (loading) {

    return (
      <Spinner
        label="Loading site information..."
        size={SpinnerSize.large}
      />
    );

  }

  if (error) {

    return (

      <Stack tokens={{ childrenGap: 12 }}>

        <MessageBar
          messageBarType={MessageBarType.error}
        >
          {error}
        </MessageBar>

        <PrimaryButton
          text="Retry"
          onClick={() => void refresh()}
        />

      </Stack>

    );

  }

  return (
    <SiteInfoCard currentSite={currentSite} />
  )
};

export default SiteContainer;
