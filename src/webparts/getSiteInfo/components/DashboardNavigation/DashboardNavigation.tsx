import * as React from "react";

import {

    Pivot,

    PivotItem

} from "@fluentui/react";

import { IDashboardNavigationProps } from "./IDashboardNavigationProps";

const DashboardNavigation: React.FC<IDashboardNavigationProps> = ({

    selectedKey,

    onChange

}) => {

    return (

        <Pivot

            selectedKey={selectedKey}

            onLinkClick={(item) => {

                if (item?.props.itemKey) {

                    onChange(item.props.itemKey);

                }

            }}

        >

            <PivotItem

                headerText="Overview"

                itemKey="overview"

            />

            <PivotItem

                headerText="Contents"

                itemKey="contents"

            />

            <PivotItem

                headerText="People"

                itemKey="people"

            />

            <PivotItem

                headerText="Security"

                itemKey="security"

            />

            <PivotItem

                headerText="Health"

                itemKey="health"

            />

        </Pivot>

    );

};

export default DashboardNavigation;