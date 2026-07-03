export const formatStorage = (bytes: number): string => {
    const storageInGB = bytes / (1024 * 1024 * 1024);
    return `${storageInGB.toFixed(2)} GB`
};

export const calculateStoragePercentage = (
    used: number,
    quota: number
): number => {

    if (quota === 0) {
        return 0;
    }

    return (used / quota)* 100;
};