import * as React from "react";

import {

    Spinner,

    SpinnerSize,

    MessageBar,

    MessageBarType

} from "@fluentui/react";

import { IAsyncContentProps } from "./IAsyncContentProps";

const AsyncContent: React.FC<IAsyncContentProps> = ({

    loading,

    error,

    children

}) => {

    if (loading) {

        return (

            <Spinner

                size={SpinnerSize.medium}

                label="Loading..."

            />

        );

    }

    if (error) {

        return (

            <MessageBar

                messageBarType={MessageBarType.error}

            >

                {error}

            </MessageBar>

        );

    }

    return <>{children}</>;

};

export default AsyncContent;