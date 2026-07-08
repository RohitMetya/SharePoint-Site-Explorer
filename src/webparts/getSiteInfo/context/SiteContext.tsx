import * as React from "react";
import { createContext } from "react";
import { ISelectedSite } from "../models/ISelectedSite";

export interface ISiteContext {
    selectedSite: ISelectedSite | null;
    selectSite: (site: ISelectedSite) => void;
    clearSite: () => void;
}

export const SiteContext = createContext<ISiteContext | undefined>(undefined);

interface ISiteProviderProps {
    children: React.ReactNode;
}

export const SiteProvider: React.FC<ISiteProviderProps> = ({ children }) => {

    const [selectedSite, setSelectedSite] = React.useState<ISelectedSite | null>(null);

    const selectSite = (site: ISelectedSite): void => {
        setSelectedSite(site);
    };

    const clearSite = (): void => {
        setSelectedSite(null);
    };

    return (
        <SiteContext.Provider
            value={{
                selectedSite,
                selectSite,
                clearSite
            }}
        >
            {children}
        </SiteContext.Provider>
    );
};

export const useSite = (): ISiteContext => {

    const context = React.useContext(SiteContext);

    if (!context) {
        throw new Error("useSite must be used within SiteProvider");
    }

    return context;

};