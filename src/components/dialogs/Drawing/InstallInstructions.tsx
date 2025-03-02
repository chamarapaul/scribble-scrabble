// src/components/InstallInstructions.tsx
'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';

// Type for browsers that support PWA standalone mode
interface StandaloneNavigator extends Navigator {
  standalone?: boolean;
}

export const InstallInstructions = () => {
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if already installed
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as StandaloneNavigator).standalone ||
        document.referrer.includes('android-app://');
      
      setIsStandalone(isStandalone);

      // Detect platform
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(userAgent)) {
        setPlatform('ios');
      } else if (/android/.test(userAgent)) {
        setPlatform('android');
      }
    }
  }, []);

  // Don't show if not mobile or already installed
  if (!platform || isStandalone) {
    return null;
  }

  return (
    <div>
      <h3 className="font-fredoka text-lg text-gray-800 mb-4 flex items-center gap-2">
      <FontAwesomeIcon 
          icon={faMobileScreen} 
          className="w-5 h-5"
          style={{ color: 'text-gray-800' }}
        />
        To Install on your Device:
      </h3>

      <div className="bg-gray-50 p-6 rounded-lg">
        <ol className="space-y-3 font-fredoka list-disc pl-5">
          {platform === 'ios' ? (
            <>
              <li>Tap the Share button on your browser toolbar</li>
              <li>Find and tap &quot;Add to Home Screen&quot; in the share menu</li>
            </>
          ) : (
            <>
              <li>Tap the menu button in your browser</li>
              <li>Find and tap &quot;Install app&quot; or &quot;Add to Home Screen&quot;</li>
            </>
          )}
        </ol>
      </div>
    </div>
  );
};