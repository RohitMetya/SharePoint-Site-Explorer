import * as React from "react";

export interface IAsyncContentProps {

    loading: boolean;

    error?: string;

    children: React.ReactNode;

}