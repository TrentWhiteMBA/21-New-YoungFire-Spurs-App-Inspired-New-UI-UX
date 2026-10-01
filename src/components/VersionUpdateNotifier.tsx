import React, { useEffect } from 'react';

export const VersionUpdateNotifier: React.FC = () => {
  useEffect(() => {
    // Periodically checks version.json for hot updates
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/version.json?t=' + Date.now());
        if (res.ok) {
          const data = await res.json();
          const stored = localStorage.getItem('youngfire_app_version');
          if (!stored) {
            localStorage.setItem('youngfire_app_version', data.version || '1.0.2');
          } else if (data.version && data.version !== stored) {
            localStorage.setItem('youngfire_app_version', data.version);
            // Optionally reload or silently update
          }
        }
      } catch {}
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default VersionUpdateNotifier;
