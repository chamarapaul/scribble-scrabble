// src/components/VersionChecker.tsx
'use client';

import { useEffect } from 'react';

declare const window: Window & typeof globalThis;

const isDev = process.env.NODE_ENV === 'development';
const ONE_DAY = 1000 * 60 * 60 * 24;

export function VersionChecker() {
  useEffect(() => {
    const currentVersion = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';
    let serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

    const shouldCheck = () => {
      if (isDev) return false; // Disable checks in dev mode to prevent constant refreshes

      const lastCheck = localStorage.getItem('lastVersionCheck');
      if (!lastCheck) return true;

      const now = Date.now();
      const timeSinceLastCheck = now - parseInt(lastCheck, 10);
      
      return timeSinceLastCheck >= ONE_DAY;
    };

    const forceReload = () => {
      if ('caches' in window) {
        // Clear all caches then reload
        caches.keys().then((names) => {
          Promise.all(names.map(name => caches.delete(name))).then(() => {
            location.reload();
          });
        });
      } else {
        // Fallback if caches API is not available
        location.reload();
      }
    };

    const checkVersion = async () => {
      if (!shouldCheck()) return;

      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          // Use service worker for version checking on supported browsers
          serviceWorkerRegistration?.active?.postMessage({
            type: 'CHECK_VERSION',
            currentVersion
          });
        } else {
          // Fallback for iOS and browsers without service worker support
          const response = await fetch('/api/version');
          const data = await response.json();
          
          // Always update the last check timestamp
          localStorage.setItem('lastVersionCheck', Date.now().toString());
          
          // Only reload if there's actually a new version
          if (data.version && data.version !== currentVersion) {
            const lastCheck = localStorage.getItem('lastVersionCheck');
            localStorage.clear();
            localStorage.setItem('lastVersionCheck', lastCheck!);
            forceReload();
          }
        }
      } catch (error) {
        console.error('Version check failed:', error);
      }
    };

    const setupServiceWorker = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        try {
          // Register service worker
          serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js');

          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data.type === 'NEW_VERSION_AVAILABLE') {
              forceReload();
            }
          });
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    // Only run in browser environment
    if (typeof window !== 'undefined') {
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

      // Only add visibility change listener (removed focus listener to prevent double-checks)
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  return null;
}
