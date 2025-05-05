// src/components/VersionChecker.tsx
'use client';

import { useEffect, useCallback, useState } from 'react';

// Type definition for enhanced window object
interface ExtendedWindow extends Window {
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}

declare const window: ExtendedWindow & typeof globalThis;

// Constants
const isDev = process.env.NODE_ENV === 'development';
const ONE_DAY = 1000 * 60 * 60 * 24;
const VERSION_CHECK_KEY = 'lastVersionCheck';
// Access version from package.json at build time via Next.js
// This will be injected during build from next.config.js
const CURRENT_VERSION = process.env.NEXT_PUBLIC_APP_VERSION;

export function VersionChecker() {
  const [isChecking, setIsChecking] = useState(false);

  /**
   * Determines if a version check should be performed
   */
  const shouldCheck = useCallback((): boolean => {
    // Disable checks in dev mode to prevent constant refreshes
    if (isDev) return false;

    try {
      const lastCheck = localStorage.getItem(VERSION_CHECK_KEY);
      if (!lastCheck) return true;

      const now = Date.now();
      const timeSinceLastCheck = now - parseInt(lastCheck, 10);
      
      return timeSinceLastCheck >= ONE_DAY;
    } catch (error) {
      // If localStorage is not available or throws an error, default to checking
      console.warn('Error checking version history:', error);
      return true;
    }
  }, []);

  /**
   * Updates the last check timestamp
   */
  const updateLastCheckTimestamp = useCallback((): void => {
    try {
      localStorage.setItem(VERSION_CHECK_KEY, Date.now().toString());
    } catch (error) {
      console.warn('Failed to update version check timestamp:', error);
    }
  }, []);

  /**
   * Forces a reload after clearing relevant caches
   */
  const forceReload = useCallback(async (): Promise<void> => {
    try {
      if ('caches' in window) {
        // Save the timestamp before clearing caches
        const lastCheck = localStorage.getItem(VERSION_CHECK_KEY);
        
        // Clear all caches
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map(name => caches.delete(name)));
        
        // Restore timestamp to prevent immediate re-check after reload
        if (lastCheck) {
          localStorage.setItem(VERSION_CHECK_KEY, lastCheck);
        }
      }
      
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error during cache clearing and reload:', error);
      // Fallback reload if cache clearing fails
      window.location.reload();
    }
  }, []);

  /**
   * Checks for a new version using the API
   */
  const checkVersionWithApi = useCallback(async (): Promise<void> => {
    if (isChecking) return;
    
    setIsChecking(true);
    try {
      const response = await fetch('/api/version');
      
      if (!response.ok) {
        throw new Error(`Version check failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Always update the last check timestamp
      updateLastCheckTimestamp();
      
      // Only reload if there's actually a new version
      if (data.version && data.version !== CURRENT_VERSION) {
        await forceReload();
      }
    } catch (error) {
      console.error('Version check failed:', error);
    } finally {
      setIsChecking(false);
    }
  }, [forceReload, isChecking, updateLastCheckTimestamp]);

  /**
   * Sets up the service worker for version checking
   */
  const setupServiceWorker = useCallback(async (): Promise<void> => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    try {
      // Register service worker
      window.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js');

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'NEW_VERSION_AVAILABLE') {
          forceReload();
        }
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }, [forceReload]);

  /**
   * Handles version checking logic
   */
  const checkVersion = useCallback(async (): Promise<void> => {
    if (!shouldCheck()) return;

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Use service worker for version checking on supported browsers
      try {
        window.serviceWorkerRegistration?.active?.postMessage({
          type: 'CHECK_VERSION',
          currentVersion: CURRENT_VERSION
        });
      } catch (error) {
        console.error('Error posting message to service worker:', error);
        // Fallback to API check if service worker messaging fails
        await checkVersionWithApi();
      }
    } else {
      // Fallback for iOS and browsers without service worker support
      await checkVersionWithApi();
    }
  }, [shouldCheck, checkVersionWithApi]);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Initial setup
    setupServiceWorker();
    
    // Initial version check
    checkVersion();

    // Setup event listeners
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkVersion();
      }
    };

    // Only add visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkVersion, setupServiceWorker]);

  return null;
}