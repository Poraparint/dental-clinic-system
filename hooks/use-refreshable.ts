import { useEffect, useState } from "react";

export function useRefreshable(isLoading?: boolean) {
    const [refreshKey, setRefreshKey] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setRefreshKey((prev) => prev + 1);
    };

    useEffect(() => {
        if (!isLoading && isRefreshing) {
            setIsRefreshing(false);
        }
    }, [isLoading, isRefreshing]);

    return {
        refreshKey,
        handleRefresh,
        isRefreshing,
    };

};