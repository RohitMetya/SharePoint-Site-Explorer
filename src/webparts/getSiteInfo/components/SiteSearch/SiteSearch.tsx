import * as React from "react";
import {
    Stack,
    Label,
    TextField,
    PrimaryButton
} from "@fluentui/react";

import { ISiteSearchProps } from "./ISiteSearchProps";
import { useState } from "react";

const SiteSearch: React.FC<ISiteSearchProps> = ({
    onAnalyze,
    loading = false
}) => {

    const [siteUrl, setSiteUrl] = useState("");

    return (

        <Stack
            tokens={{ childrenGap: 12 }}
        >

            <Label>

                SharePoint Site URL

            </Label>

            <TextField

                value={siteUrl}

                placeholder="https://contoso.sharepoint.com/sites/HR"

                onChange={(_, value) =>
                    setSiteUrl(value ?? "")
                }

            />

            <PrimaryButton

                text="Analyze Site"

                disabled={!siteUrl.trim() || loading}

                onClick={() => onAnalyze(siteUrl)}

            />

        </Stack>

    );

};

export default SiteSearch;