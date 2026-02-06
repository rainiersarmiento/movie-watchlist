'use client'
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { imdbID, imdbList } from './lib/definitions';

const WATCHLIST_STORAGE_KEY = 'movie-watchlist-ids';

// Define a type for the context state
interface WatchlistContextType {
    list: imdbID[];  // An array of movie IDs (strings)
    setWatchList: React.Dispatch<React.SetStateAction<imdbList>>; // Function to update the watchlist
}

// Create context with an initial empty value
const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

// Hook to use the WatchlistContext
export function useWatchlistContext() {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlistContext must be used within a WatchlistProvider');
    }
    return context;
}

function loadWatchlistFromStorage(): imdbList {
    if (typeof window === 'undefined') return [];
    try {
        const stored = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// WatchlistProvider component that wraps the children
export const WatchlistProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [watchlist, setWatchList] = useState<imdbList>([]);
    const hasLoadedFromStorage = useRef(false);

    // Hydrate from localStorage on mount
    useEffect(() => {
        setWatchList(loadWatchlistFromStorage());
        hasLoadedFromStorage.current = true;
    }, []);

    // Persist to localStorage whenever the watchlist changes (after initial load)
    useEffect(() => {
        if (!hasLoadedFromStorage.current) return;
        try {
            window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
        } catch {
            // ignore quota or other storage errors
        }
    }, [watchlist]);

    return (
        <WatchlistContext.Provider value={{ list: watchlist, setWatchList }}>
            {children}
        </WatchlistContext.Provider>
    );
};