import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: location.pathname,
        referrer: document.referrer
      })
    }).catch(() => {});
  }, [location.pathname]);
};

export default useAnalytics;
